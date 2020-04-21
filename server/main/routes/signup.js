var express = require('express')
var router = express.Router()

const User = require('../models/user');
const UserDetails = require('../models/userDetails');

const validation = require('../utils/validate')

router.post('/', (req, res) => {
	var payload = validation.validateSignupForm(req.body)
	if(payload.success)
	{
		const { username, fullname, email, password, pwconfirm } = req.body;
		
		User.create({
			username: username,
			email: email,
			password: password
		})
		.then(function(user) {
			console.log(`user ${user.dataValues.username} is added`)
			console.log(fullname)
			UserDetails.create({
				username: user.dataValues.username,
				fullname: fullname
			})
			.then(function(user_details) { 
				res.json(payload)

			})
			.catch(function(error) {
				payload.success = false;
				payload.errors = {message: error.errors[0].message}
				res.json(payload)
			});
		})
		.catch(function(error) {
			payload.success = false;
			payload.errors = {message: error.errors[0].message}
			res.json(payload)
		});
	}
	else{
		res.json(payload)
	}
})

module.exports = router