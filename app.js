var express = require('express');

var app = express();

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get('/', function(req, res) {
    res.send('You are in home page');
})

.get('/login', function(req, res) {
    res.send('You are in login page');
})

.get('/login/:user_name/:password', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello ' + req.params.user_name + '. Your password is: ' + req.params.password);
})

.use(function(req, res, next){
    res.status(404).send('Page not found !');
})

.listen(8080);   