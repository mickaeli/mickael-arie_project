var express = require('express')
var router = express.Router({ mergeParams: true })
const UserDetails = require('../models/userDetails');

router.get('/', (req, res) => {

  var username = req.params.username

  UserDetails.findOne({ where: { username: username } })
  .then(function (user_details) {

    //case 1: there is not record in the db for this user
    if (!user_details) {
      res.json({
        success: false
      })

    //case 2: record founded
    } else {
      res.json({
        success: true,
        fullname: user_details.dataValues.fullname
      })

    }
  })
  .catch(function(error) {
    success = false;
  });

})

module.exports = router