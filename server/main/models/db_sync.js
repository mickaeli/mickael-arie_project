const User = require('./user');
const UserDetails = require('./userDetails');
const Post = require('./post');

module.exports = (function() {
  var that = {
    create_tables: function() {
      // create db tables

      User.hasOne(UserDetails, {foreignKey: 'username'});
      User.hasMany(Post, {foreignKey: 'author'});

      UserDetails.belongsTo(User, {foreignKey: 'username'});
      Post.belongsTo(User, {foreignKey: 'author'});

      //create users table
      User.sync()
      .then(() => {
        console.log('users table has been successfully created, if one doesn\'t exist')
        //create users_details table
        UserDetails.sync()
        .then(() => {
          console.log('users_details table has been successfully created, if one doesn\'t exist')
          //create posts table
          Post.sync()
          .then(() => console.log('posts table has been successfully created, if one doesn\'t exist'))
          .catch(error => console.log('This error occured', error))
        })
        .catch(error => console.log('This error occured', error));
      })
      .catch(error => console.log('This error occured', error));
    }
  }
  return that;
})(); 