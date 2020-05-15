const User = require('./user');
const UserDetails = require('./userDetails');
const Post = require('./post');

module.exports = (function() {
  var that = {
    create_tables: function() {
      
      //define associations between models
      User.hasOne(UserDetails, {
        foreignKey: {
          name: 'username',
          allowNull: false
        }
      });
      User.hasMany(Post, {
        foreignKey: {
          name: 'author',
          allowNull: false
        }
      });

      UserDetails.belongsTo(User, {
        foreignKey: {
          name: 'username',
          allowNull: false
        }
      });
      Post.belongsTo(User, {
        foreignKey: {
          name: 'author',
          allowNull: false
        }
      });

      //create db tables

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