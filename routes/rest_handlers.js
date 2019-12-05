
const path = require('path');
const User = require('../models/user');
const validator = require('../validator');

const getIndex = function(req, res) {
    res.redirect('/login');
};

const getSignup = function(req, res) {
	res.sendFile(path.join(__dirname, '../views', 'signup.html'));
};

const postSignup = function(req, res) {
		
	const { username, email, password } = req.body;
	
	if(!validator.checkValidation(username, email, password)) {
		/*res.writeHead(302, {
			'Location': '/signup'
		});
		res.end();*/
		res.redirect('/signup');
		return;
	}
	
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
	.then(function(user) {
		req.session.user = user.dataValues;
		res.redirect('/dashboard');
	})
	.catch(function(error) {
		console.log('username already in use!');
		res.redirect('/signup');
	});
};

const getLogin = function(req, res) {
	res.sendFile(path.join(__dirname, '../views', 'login.html'));
};


const postLogin = function(req, res) {
	const { username, password } = req.body;

	User.findOne({ where: { username: username } }).then(function (user) {
		if (!user) {
			console.log('username is empty');
			res.redirect('/login');
		} else if (!user.validPassword(password)) {
			console.log('password is wrong');
			res.redirect('/login');
		} else {
			req.session.user = user.dataValues;
			res.redirect('/dashboard');
		}
	});
};

const getDashBoard = function(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
    } else {
        res.redirect('/login');
    }
};

const getLogout = function(req, res) {
    if (req.session.user && req.cookies.user_sid) {
		
        res.clearCookie('user_sid');
        res.redirect('/');
		
    } else {
		
        res.redirect('/login');
		
    }
};

module.exports = {
  getIndex,
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  getDashBoard,
  getLogout
};