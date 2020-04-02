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

  //delete picture from cloudinary account
  cloudinary.uploader.destroy(username + '_profile', (err, result) => {

    //image deleted successfully
    if(!err) {
      Profile_picture.destroy({ where: { username: username } })
      .then(row_deleted => {

        //image deleted successfully from db
        if(row_deleted === 1) {
            console.log('Deleted successfully')
            res.json({
                success: true
            })
        //image deletion from db failed
        } else {
            console.log('Deleted failed')
            res.json({
                success: false
            })
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