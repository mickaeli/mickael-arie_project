var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');
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
  },
  requests_sent: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    allowNull: false
  },
  requests: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    allowNull: false
  },
  friends_list: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
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

// export User model for use in other files.
module.exports = User;
