var express = require('express')
var router = express.Router()

const User = require('../models/user');
const UserDetails = require('../models/userDetails');

const validation = require('../utils/validate')

router.post('/', (req, res) => {
	var payload = validation.validateSignupForm(req.body)
	if(payload.success)
	{
		const { username, email, password, pwconfirm } = req.body;
		
		User.create({
			username: username,
			email: email,
			password: password
		})
		.then(function(user) {
			console.log(`user ${user.dataValues.username} is added`)

			UserDetails.create({
				username: user.dataValues.username
			})
			.then(function(user_details) { 
				res.json(payload)
				// req.session.user = user.dataValues;
				//res.redirect('/dashboard');

			})
			.catch(function(error) {
				payload.success = false;
				payload.errors = {message: error.errors[0].message}
				res.json(payload)
				//res.redirect('/signup');
			});
		})
		.catch(function(error) {
			payload.success = false;
			payload.errors = {message: error.errors[0].message}
			res.json(payload)
			//res.redirect('/signup');
		});
	}
	else{
		res.json(payload)
	}
})

module.exports = router