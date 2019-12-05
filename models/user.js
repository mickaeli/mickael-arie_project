var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize('postgres', 'mickael', 'mickael_israel', {
  host: 'localhost',
  dialect: 'postgres'
});
//var sequelize = new Sequelize('postgres://mickael@localhost:5432/api');

// setup User model and its fields.
var User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    /*instanceMethods: {
      validPassword: function(password) {
		//console.log('I am in validPassword function!!');
        return bcrypt.compareSync(password, this.password);
      }
    }   */ 
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;