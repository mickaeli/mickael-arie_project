var express = require('express')
var router = express.Router({ mergeParams: true })

const Post = require('../models/post');
const User = require('../models/user');
const UserDetails = require('../models/userDetails');


router.post('/', (req, res) => {

  const { post_id, comment_text, isAnonymous, comment_author } = req.body;

  Post.create({
    text: comment_text,
    is_anonymous: isAnonymous,
    author: comment_author,
    father_id: post_id
  })
  .then(function(comment) {
    res.json({
      success: true,
      comment_id: comment.dataValues.id,
      comment_date: comment.dataValues.updatedAt
    })

  })
  .catch(function(error) {
    console.log("create comment failed")
    res.json({
      success: false
    })
  });

})


router.get('/', (req, res) => {

  const father_id = req.params.father_id

  Post.findAll({
    include: [{
      model: User,
      required: true,
      include: [{model: UserDetails, required: true }]
     }],
    where: {father_id: father_id},
    order: [
      ['id', 'ASC']
    ],
    raw: true
  })
  .then(function(comments) {

    //case 1: there is no comments for this post
    if (comments.length === 0) {
      console.log("no comment found")
      res.json({
        success: false
      })

      //case 2: record founded
    } else {

      console.log("comments found")

      var comments_array = []

      comments.forEach( comment => {
        comments_array.push({
          id: comment.id,
          text: comment.text,
          profilePicture: comment['user.users_detail.url_picture'],
          authorUsername: comment.author,
          authorFullname: comment['user.users_detail.fullname'],
          date: comment.updatedAt,
          isAnonymous: comment.is_anonymous
        })
      })
      
      res.json({
        success: true,
        comments: comments_array
      })
      
    }
  })
  .catch(function(error) {
    console.log('comment search failed')
    res.json({
      success: false
    })
  });

})

module.exports = router