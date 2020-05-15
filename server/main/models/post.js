var Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')})

// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

// setup Post model and its fields.
var Post = sequelize.define('posts', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  edited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  father_id: {
    type: Sequelize.INTEGER,
    defaultValue: -1,
    allowNull: false
  }
});

// export Post model for use in other files.
module.exports =  Post;