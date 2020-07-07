const { addUser, removeUser, getUserByName, getUserById, getUsers } = require('./active_users');

const socketConnect = (io, socket) => {

  socket.on('join', name => {
    const user = addUser({ id: socket.id, name });
    console.log(`user ${user.name} added in activeUsers`);

    socket.emit('activeUsers', getUsers());

    socket.broadcast.emit('userConnected', name)
  });

  socket.on('connectToNewFriend', ({sender, receiver}) => {
    socket.broadcast.emit('newFriendConnected', {sender, receiver})

    if(getUserByName(receiver)) {
      socket.emit('newFriendConnected', {sender: receiver, receiver: sender})
    }
  })

  socket.on('joinToRoom', ({friendName, roomName, sendEventToFriend}) => {

    socket.join(roomName)
    if(sendEventToFriend) {

      const user = getUserById(socket.id)

      socket.broadcast.emit('joinToRoom', {friendName, roomName})
      socket.broadcast.to(roomName).emit('message', {message: {user: 'admin', text: `${user.name} has join`}, room: roomName})
    }
  })

  socket.on('leaveRoom', ({roomName, sendEventToFriend}) => {
    
    socket.leave(roomName)
    if(sendEventToFriend) {

      const user = getUserById(socket.id)

      socket.broadcast.to(roomName).emit('message', {message: {user: 'admin', text: `${user.name} has left. To continue the discussion, please open a new window`}, room: roomName})
      //socket.broadcast.to(roomName).emit('leaveRoom', roomName)
    }
  })

  socket.on('sendMessage', ({message, room}, callback) => {

    const user = getUserById(socket.id)

    io.to(room).emit('message', {message: {user: user.name, text: message}, room})

    callback()
  })

}

const socketDisconnect = (io, socket) => {

  const user = removeUser(socket.id);

  if(user) {
    socket.broadcast.emit('message', { user: 'Admin', text: `${user.name} has left.` });
    socket.broadcast.emit('userDisconnected', user.name);
  }
}

module.exports = { socketConnect, socketDisconnect }