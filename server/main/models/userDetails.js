var Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')})

// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});
//var sequelize = new Sequelize('postgres://mickael@localhost:5432/api');


// setup UserDetails model and its fields.
var UserDetails = sequelize.define('users_details', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    references: {
        model: 'users', // 'users' refers to table name
        key: 'username', // 'username' refers to column name in users table
      }
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url_picture: {
    type: Sequelize.STRING,
    defaultValue: 'https://res.cloudinary.com/gooder/image/upload/v1588001434/default_profile_picture.png',
    allowNull: false
  },
  url_background: {
    type: Sequelize.STRING,
    defaultValue: 'https://res.cloudinary.com/gooder/image/upload/v1588001427/default_profile_background.jpg',
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: 'No description yet',
    allowNull: false
  }
});

// export UserDetails model for use in other files.
module.exports =  UserDetails;
