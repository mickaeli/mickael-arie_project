var express = require('express')
var router = express.Router({ mergeParams: true })
var cloudinary = require('cloudinary').v2;
const UserDetails = require('../models/userDetails');

cloudinary.config({ 
  cloud_name: 'gooder', 
  api_key: '412392824469739', 
  api_secret: '7pGkecxCL-pku_7F4rRadLUDlI0'
});

router.post('/', (req, res) => {

  var username = req.params.username

  console.log(req.files.profile_background)

  file = req.files.profile_background

  //upload background to cloudinary account
  cloudinary.uploader.upload(file.tempFilePath,
    { public_id: username + '_background' },
    // { eager: [
    //   {gravity: "face", width: 150, height: 150, crop: "thumb"} ]},
     (err, result) => {

    // console.log(JSON.stringify(result))
    // console.log(result['url'])

    // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

        //background uploaded successfully
        if(!err) {

          UserDetails.findOne({ where: { username: username } })
          .then( user_details => {

            //there isn't record for this user in a db
            if(!user_details) {

              UserDetails.create({
                username: username,
                url_background: result['url']
              })
              .then(function(user_details) {
                console.log(`user ${user_details.dataValues.url_background} is added`)
                res.json({
                  success: true,
                  url: result['url']
                })
              })
              .catch(function(error) {
                res.json({
                  success: false
                })
              });
              
              //there is a record for this user in a db
            } else {

              UserDetails.update(
                { url_background: result['url'] },
                { where: { username: user_details.dataValues.username } }
              )
                .then(reslt =>
                  {
                    res.json({
                      success: true,
                      url: result['url']
                    })
                  }
                )
                .catch(err =>
                  {
                    res.json({
                      success: false
                    })
                  }
                )
            }
          })

          //background upload failed
        } else {
          res.json({
            success: false
          })
        }
      })
})

router.get('/', (req, res) => {

  var username = req.params.username

  UserDetails.findOne({ where: { username: username } })
  .then(function (user_details) {

    // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

    if (!user_details) {
      res.json({
        success: false
      })

    } else {
      res.json({
        success: true,
        url: user_details.dataValues.url_background
      })

    }
  })
})


router.delete('/', (req, res) => {

  var username = req.params.username

  //delete picture from cloudinary account
  cloudinary.uploader.destroy(username + '_background', (err, result) => {

    //image deleted successfully
    if(!err) {
      UserDetails.findOne({ where: { username: username } })
      .then( user_details => {

        //there isn't record for this user in a db
        if(!user_details) {
          res.json({
            success: true
          })
          
          //there is a record for this user in a db
        } else {

          UserDetails.update(
            { url_background: 'https://res.cloudinary.com/gooder/image/upload/default_profile_background.jpg' },
            { where: { username: user_details.dataValues.username } }
          )
            .then(reslt =>
              {
                res.json({
                  success: true
                })
              }
            )
            .catch(err =>
              {
                res.json({
                  success: false
                })
              }
            )
        }
      })

    //image deletion failed
    } else {
      res.json({
          success: false
      })
    }
  });
})

module.exports = router