var express = require('express')
var router = express.Router({ mergeParams: true })
const UserDetails = require('../models/userDetails');

router.get('/', (req, res) => {

  var username = req.params.username

  UserDetails.findOne({ where: { username: username } })
  .then(function (user_details) {

    if (!user_details) {
      res.json({
        success: false
      })

    } else {
      res.json({
        success: true,
        fullname: user_details.dataValues.fullname
      })

    }
  })
})

module.exports = router