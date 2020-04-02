var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fileupload = require('express-fileupload')

var signupRouter = require('./routes/signup')
var signinRouter = require('./routes/signin')
var profileImgRouter = require('./routes/profile_picture')
var deleteProfileImgRouter = require('./routes/delete_profile_picture')

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileupload({
    useTempFiles: true
}))

app.use('/signup', signupRouter)
app.use('/signin', signinRouter)
app.use('/profile_picture/:username', profileImgRouter)
app.use('/delete_profile_picture/:username', deleteProfileImgRouter)

module.exports = app;