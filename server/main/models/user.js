var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')})

const UserDetails = require('./userDetails')
const Post = require('./post')

// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

// setup User model and its fields.
var User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  username: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: {
        args: true,
        msg: 'Username is not available'
      },
      allowNull: false
  },
  email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Email is already taken'
      },
      allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    hooks: {
      beforeCreate: function(user) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }   
});

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// User.hasOne(UserDetails);
// User.hasMany(Post);

// create all the defined tables in the specified database.
// sequelize.sync()
// .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
// .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;
