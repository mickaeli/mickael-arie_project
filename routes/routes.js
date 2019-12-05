
const handlers = require('./rest_handlers');
const User = require('../models/user');

const sessionChecker = function(req, res, next) {
	
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
	
};

const route = function(app) {
	
// route for Home-Page
app.get('/', sessionChecker, handlers.getIndex);


// route for user signup
app.route('/signup')
    .get(sessionChecker, handlers.getSignup)
    .post(handlers.postSignup);


// route for user Login
app.route('/login')
    .get(sessionChecker, handlers.getLogin)
    .post(handlers.postLogin);


// route for user's dashboard
app.get('/dashboard', handlers.getDashBoard);


// route for user logout
app.get('/logout', handlers.getLogout);

};

module.exports = {
	route
}