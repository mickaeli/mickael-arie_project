var express = require('express')
var router = express.Router({ mergeParams: true })
const UserDetails = require('../models/userDetails');

const validation = require('../utils/validate')

router.put('/', (req, res) => {

  //make validation for request data (fullname + description)
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
      console.log('updating profile_details failed', err);
      payload.success = false;
      res.json(payload)
		});

  //failed validation
  } else{
    console.log('failed validation in put/profile_details');
    res.json(payload)
  }

})


router.get('/', (req, res) => {

  var username = req.params.username

  UserDetails.findOne(
    {where: {username: username}},
    {raw: true}
  )
  .then(function (user) {

    //case 1: there is no user in the db
    if (!user) {
      console.log("no user found")
      res.json({
        success: false
      })

      //case 2: record founded
    } else {

      console.log("user found")
      
      res.json({
        success: true,
        userDetails: {
          fullname: user.fullname,
          profilePicture: user.url_picture,
          profileBackground: user.url_background,
          description: user.description
        }
      })
      
    }
  })
  .catch(function(error) {
    console.log('user search failed')
    res.json({
      success: false
    })
  });

})

module.exports = router