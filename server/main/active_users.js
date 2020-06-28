const users = [];

const addUser = ({ id, name }) => {

  const user = { id, name };

  users.push(user);

  console.log(users);

  return user;
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
  const user = users.find((user) => user.id === id)
};

const getUsers = () => users.map(user => user.name)

module.exports = { addUser, removeUser, getUser, getUsers };