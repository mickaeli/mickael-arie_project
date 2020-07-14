var Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')})

// create a sequelize instance with our local postgres database information.
let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

// checks if env is Heroku, if so, sets sequelize to utilize the database hosted on heroku
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres'
  })
}

// setup UserDetails model and its fields.
var UserDetails = sequelize.define('users_details', {
  fullname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url_picture: {
    type: Sequelize.STRING,
    defaultValue: 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png',
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
