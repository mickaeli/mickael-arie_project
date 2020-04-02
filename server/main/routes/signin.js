var express = require('express')
var router = express.Router()

const User = require('../models/user');
const validation = require('../utils/validate')

router.post('/', (req, res) => {
var payload = validation.validateSigninForm(req.body)
if(payload.success){
	const { username, password } = req.body;
	User.findOne({ where: { username: username } })
	.then(function (user) {
		if (!user) {
			payload.success = false;
			payload.errors = {message: 'incorrect username'}
			res.json(payload)
			//res.redirect('/login');
		} else if (!user.validPassword(password)) {
			payload.success = false;
			payload.errors = {message: 'incorrect password'}
			res.json(payload)
			//res.redirect('/login');
		}
		else{
			res.json(payload)
		}
	})
}
else{
	res.json(payload)
}
})

module.exports = router