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
  var file = req.files.profile_picture
  console.log('file = ', file)

  //upload picture to cloudinary account
  cloudinary.uploader.upload(file.tempFilePath,
  { public_id: username + '_picture' },
  (err, result) => {

    //picture uploaded successfully
    if(!err) {
      console.log("picture uploaded successfully")

      UserDetails.update(
        { url_picture: result['url'] },
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

    //picture upload failed
    } else {
      console.log("picture upload failed")
      console.log(err)
      
      res.json({
        success: false
      })
    }
  })
})

router.delete('/', (req, res) => {

  var username = req.params.username

  //delete picture from cloudinary account
  cloudinary.uploader.destroy(username + '_picture', (err, result) => {

    //picture deleted successfully
    if(!err) {

      UserDetails.update(
        { url_picture: 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png' },
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

    //picture deletion failed
     else {
      res.json({
          success: false
      })
    }
  });
})

module.exports = router
