var express = require('express')
var Sequelize = require('sequelize')
var router = express.Router()

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const DB_sync = require('../models/db_sync');

const validation = require('../utils/validate')

// create user tables
DB_sync.create_tables();

router.post('/', (req, res) => {

  //make validation for request data (username + fullname + email + password)
  var payload = validation.validateSignupForm(req.body)
  
  //successful validation
	if(payload.success)
	{
		const { username, fullname, email, password, pwconfirm } = req.body;
		
		User.create({
			username: username,
			email: email,
			password: password
		})
		.then(function(user) {
			console.log(`user ${user.dataValues.username} added`)
			UserDetails.create({
				username: user.dataValues.username,
				fullname: fullname
			})
			.then(function(user_details) {
				console.log("user_details row added")
				res.json(payload)

			})
			.catch(function(error) {
				console.log("create user_details row failed")
				res.json(payload)
			});
		})
		.catch(function(error) {
			console.log("create user failed")
			payload.success = false;
			res.json(payload)
		});
  }
  
  //failed validation
	else{
		res.json(payload)
	}
})

module.exports = router
