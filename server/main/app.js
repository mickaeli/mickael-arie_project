var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const cors = require('cors');

var fileupload = require('express-fileupload')

var signupRouter = require('./routes/signup')
var signinRouter = require('./routes/signin')

var profileImgRouter = require('./routes/profile_picture')
var profileBgRouter = require('./routes/profile_background')

var profileDescriptionRouter = require('./routes/profile_description')
var profileFullnameRouter = require('./routes/profile_fullname')
var profileDetailsRouter = require('./routes/profile_details')

var postRouter = require('./routes/post')
var commentRouter = require('./routes/comment')

const friendsRouter = require('./routes/friends')


var app = express();

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static(__dirname));
  console.log("hello")

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'));
  });
}

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

// app.use(cors())

app.use('/signup', signupRouter)
app.use('/signin', signinRouter)

app.use('/profile_picture/:username', profileImgRouter)
app.use('/profile_background/:username', profileBgRouter)

app.use('/profile_description/:username', profileDescriptionRouter)
app.use('/profile_fullname/:username', profileFullnameRouter)
app.use('/profile_details/:username?', profileDetailsRouter)

app.use('/post/:id?', postRouter)
app.use('/comment/:father_id?', commentRouter)

app.use('/friends', friendsRouter)

module.exports = app;
