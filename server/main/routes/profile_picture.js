var express = require('express')
var router = express.Router({ mergeParams: true })
var cloudinary = require('cloudinary').v2;
const Profile_picture = require('../models/profile_picture');


cloudinary.config({ 
  cloud_name: 'gooder', 
  api_key: '412392824469739', 
  api_secret: '7pGkecxCL-pku_7F4rRadLUDlI0' 
});

router.post('/', (req, res) => {

  var username = req.params.username

  // console.log(req.params.username)
  console.log(req.files.profile_picture)

  file = req.files.profile_picture

  //upload picture to cloudinary account
  cloudinary.uploader.upload(file.tempFilePath,
    { public_id: username + '_profile' },
    // { eager: [
    //   {gravity: "face", width: 150, height: 150, crop: "thumb"} ]},
     (err, result) => {

    // console.log(JSON.stringify(result))
    // console.log(result['url'])

    // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

        //picture uploaded successfully
        if(!err) {

          Profile_picture.findOne({ where: { username: username } })
          .then( profile_picture => {

            //there isn't record for this user in a db
            if(!profile_picture) {

              Profile_picture.create({
                username: username,
                url_photo: result['url']
              })
              .then(function(profile_picture) {
                console.log(`user ${profile_picture.dataValues.url_photo} is added`)
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

              Profile_picture.update(
                { url_photo: result['url'] },
                { where: { username: profile_picture.dataValues.username } }
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

          //picture upload failed
        } else {
          res.json({
            success: false
          })
        }
      })
})

router.get('/', (req, res) => {

  var username = req.params.username

  Profile_picture.findOne({ where: { username: username } })
  .then(function (profile_picture) {

    // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

    if (!profile_picture) {
      res.json({
        success: false
      })

    } else {
      res.json({
        success: true,
        url: profile_picture.dataValues.url_photo
      })

    }
  })
})

module.exports = router