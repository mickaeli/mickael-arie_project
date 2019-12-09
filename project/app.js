
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var morgan = require('morgan');

const User = require('./models/user');
const router = require('./routes/routes');

const app = express();
app.set('port', 8080);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));


app.use(session({
    key: 'user_sid',
    secret: 'somerandomstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 1000 * 30 //30 minutes
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use(function(req, res, next) {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

router.route(app);

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Page not found!")
});




// start the express server
app.listen(app.get('port'), function(){
  console.log(`App running on port ${app.get('port')}`);
});