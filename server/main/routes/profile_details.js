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

module.exports = router