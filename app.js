
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', function(req, res) {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.post('/signup', db.createUser);

app.use(function(req, res){
    res.status(404).send('Page not found !');
})

app.listen(port, function(){
  console.log(`App running on port ${port}`);
});