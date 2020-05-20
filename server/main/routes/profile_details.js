var express = require('express')
var router = express.Router({ mergeParams: true })
const UserDetails = require('../models/userDetails');

const validation = require('../utils/validate')

router.put('/', (req, res) => {

  //make validation for request data (username + password)
  var payload = validation.validateProfileDetailsForm(req.body)

  //successful validation
  if(payload.success){

    var username = req.params.username
    var { fullname, description } = req.body;

    var new_description = (description === "") ? 'No description yet' : description
        
    UserDetails.update(
      { fullname: fullname,
        description: new_description
      },
      { where: { username: username } }
    )
    .then(function(result) {
      payload.fullname = fullname
      res.json(payload)
    })
    .catch(function(err) {
      payload.success = false;
      res.json(payload)
		});

  //failed validation
  } else{
    res.json(payload)
  }

})

router.get('/', (req, res) => {

  UserDetails.findAll({ 
    raw: true
  })
  .then(function (users) {

    //case 1: there is no user in the db
    if (!users) {
      console.log("no user found")
      res.json({
        success: false
      })

      //case 2: record founded
    } else {

      console.log("users found")

      var users_array = []

      users.forEach( user => {
        users_array.push({
          id: user.id,
          fullname: user.fullname,
          profile_picture: user.url_picture,
          description: user.description
        })
      })
      
      res.json({
        success: true,
        users: users_array
      })
      
    }
  })
  .catch(function(error) {
    console.log('users search failed')
    res.json({
      success: false
    })
  });

})

module.exports = router