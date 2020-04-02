var Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')})

// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});
//var sequelize = new Sequelize('postgres://mickael@localhost:5432/api');

// const users = require('./user')

// setup Profile_picture model and its fields.
var Profile_picture = sequelize.define('profile_pictures', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    references: {
        model: 'users', // 'users' refers to table name
        key: 'username', // 'username' refers to column name in users table
      }
  },
  url_photo: {
      type: Sequelize.STRING,
      allowNull: false
  }
});

// create all the defined tables in the specified database.
sequelize.sync()
.then(() => console.log('profile_pictures table has been successfully created, if one doesn\'t exist'))
.catch(error => console.log('This error occured', error));

// export Profile_picture model for use in other files.
module.exports =  Profile_picture;