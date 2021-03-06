var express = require('express')
var router = express.Router({ mergeParams: true })
var cloudinary = require('cloudinary').v2;
const UserDetails = require('../models/userDetails');

//configuration parameters for using cloudinary
cloudinary.config({ 
  cloud_name: 'gooder',
  api_key: '412392824469739',
  api_secret: '7pGkecxCL-pku_7F4rRadLUDlI0'
});

router.put('/', (req, res) => {

  //set header to fix chrome problem
  res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

  var username = req.params.username
  //var file = req.files.profile_background

  //upload background to cloudinary account
  cloudinary.uploader.upload(req.body.urlEncoded64,
  { public_id: username + '_background' },
  (err, result) => {

    //background uploaded successfully
    if(!err) {
      console.log("background uploaded successfully")

      UserDetails.update(
        { url_background: result['url'] },
        { where: { username: username } }
      )
      .then(function(query_result) {
        res.json({
          success: true,
          url: result['url']
        })
      })
      .catch(function(err) {
        res.json({
          success: false
        })
      })

    //background upload failed
    } else {
      console.log("background upload failed")
      
      res.json({
        success: false
      })
    }
  })
})

router.delete('/', (req, res) => {

  var username = req.params.username

  //delete background from cloudinary account
  cloudinary.uploader.destroy(username + '_background', (err, result) => {

    //background deleted successfully
    if(!err) {

      UserDetails.update(
        { url_background: 'https://res.cloudinary.com/gooder/image/upload/v1588001427/default_profile_background.jpg' },
        { where: { username: username } }
      )
      .then(function(query_result) {
        res.json({
          success: true
        })
      })
      .catch(function(err) {
        res.json({
          success: false
        })
      })
    }

    //background deletion failed
     else {
      res.json({
          success: false
      })
    }
  });
})

module.exports = router
