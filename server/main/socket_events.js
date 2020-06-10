const { addUser, removeUser, getUser, getUsers } = require('./active_users');

const socketConnect = (io, socket) => {

  socket.on('join', name => {
    const user = addUser({ id: socket.id, name });
    console.log(`user ${user.name} added in activeUsers`);

    socket.emit('activeUsers', getUsers());

    socket.broadcast.emit('userConnected', name)

    // socket.join(user.room);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  });


}

const socketDisconnect = (io, socket) => {

  const user = removeUser(socket.id);

  if(user) {
    socket.broadcast.emit('message', { user: 'Admin', text: `${user.name} has left.` });
    socket.broadcast.emit('userDisconnected', user.name);
  }
}

module.exports = { socketConnect, socketDisconnect }