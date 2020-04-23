var express = require('express')
var router = express.Router()

const User = require('../models/user');
const validation = require('../utils/validate')

router.post('/', (req, res) => {

  //make validation for request data (username + password)
  var payload = validation.validateSigninForm(req.body)

  //successful validation
  if(payload.success){
    const { username, password } = req.body;
    User.findOne({ where: { username: username } })
    .then(function (user) {

      //case 1: there is not record in the db for this user
      if (!user) {
        payload.success = false;
        payload.errors = {message: 'incorrect username'}
        res.json(payload)
        //case 2: password don't matches the correct one
      } else if (!user.validPassword(password)) {
        payload.success = false;
        payload.errors = {message: 'incorrect password'}
        res.json(payload)
      }
      //case 2: all it's ok
      else{
        res.json(payload)
      }
    })
    .catch(function(error) {
      payload.success = false;
      res.json(payload)
		});
    
  }

  //failed validation
  else{
    res.json(payload)
  }
})

module.exports = router