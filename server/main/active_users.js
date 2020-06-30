const users = [];

const addUser = (user) => {

  users.push(user);

  console.log(users);

  return user;
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUserByName = name => users.find(user => user.name === name)

const getUserById = id => users.find((user) => user.id === id)

const getUsers = () => users.map(user => user.name)

module.exports = { addUser, removeUser, getUserByName, getUserById, getUsers };