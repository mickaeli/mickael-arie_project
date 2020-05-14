var Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')})

const User = require('./user')

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
  // author: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   references: {
  //     model: 'users', // 'users' refers to table name
  //     key: 'username', // 'username' refers to column name in users table
  //   }
  // },
  edited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  comments_id: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: null
  },
  is_post: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
  // createdAt: {
  //   field: 'createdAt',
  //   type: Sequelize.DATE,
  //   get() {
  //       return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
  //     }
  // }
});

// Post.belongsTo(User, {foreignKey: 'username'});

// create all the defined tables in the specified database.
// sequelize.sync()
// .then(() => console.log('posts table has been successfully created, if one doesn\'t exist'))
// .catch(error => console.log('This error occured', error));

// export Post model for use in other files.
module.exports =  Post;