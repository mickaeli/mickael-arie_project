
const getIndex = function(req, res) {
    res.redirect('/login');
};

const getSignup = function(req, res) {
        res.sendFile(__dirname + './views/signup.html');
};

const postSignup = function(req, res, User) {
		
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
		res.redirect('/signup');
	});
};

const getLogin = function(req, res) {
	res.sendFile(__dirname + './views/login.html');
};


const postLogin = function(req, res, User) {
	const username = req.body.username,
		  password = req.body.password;

	User.findOne({ where: { username: username } }).then(function (user) {
		if (!user) {
			res.redirect('/login');
		} else if (!user.validPassword(password)) {
			res.redirect('/login');
		} else {
			req.session.user = user.dataValues;
			res.redirect('/dashboard');
		}
	});
};

const getDashBoard = function(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + './views/dashboard.html');
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