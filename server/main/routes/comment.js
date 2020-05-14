var express = require('express')
var router = express.Router({ mergeParams: true })
var Sequelize = require('sequelize');

const Post = require('../models/post');
const User = require('../models/user');
const UserDetails = require('../models/userDetails');


router.post('/', (req, res) => {

  const { post_id, comment_text, comment_author } = req.body;

  Post.create({
    text: comment_text,
    author: comment_author,
    is_post: false
  })
  .then(function(comment) {

    Post.update(
      { comments_id: Sequelize.fn('array_append', Sequelize.col('comments_id'), comment.dataValues.id) },
      { where: { id: post_id },
      returning: true,
      plain: true
    })
    .then(function(query_result) {
      console.log('father post updated')
      res.json({
        success: true,
        comment_id: comment.dataValues.id,
        comment_date: comment.dataValues.updatedAt
      })
    })
    .catch(function(err) {
      console.log('father post update failed')
      res.json({
        success: false
      })
    })

  })
  .catch(function(error) {
    console.log(error)
    console.log("create comment failed")
    res.json({
      success: false
    })
  });

})


router.get('/', (req, res) => {

  //convert string of comments id's to array
  const comments_id = req.params.ids ? JSON.parse("[" + req.params.ids + "]") : ''

  Post.findAll({
    include: [{
      model: User,
      required: true,
      include: [{model: UserDetails, required: true }]
     }],
    where: {id: comments_id},
    order: [
      ['id', 'ASC']
    ],
    raw: true
  })
  .then(function(comments) {
    //case 1: there is no comments for this post
    if (!comments) {
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
          author: comment['user.users_detail.fullname'],
          date: comment.updatedAt
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

router.delete('/', (req, res) => {

  //convert string of comments id's to array
  const comments_id = req.params.ids ? JSON.parse("[" + req.params.ids + "]") : ''

  Post.destroy({ where: { id: comments_id } })
  .then(row_deleted => {

    //comments deleted successfully from db
    if(row_deleted === comments_id.length) {
      console.log('comments deleted successfully')
      res.json({
          success: true
      })
    //comments deletion from db failed
    } else {
        console.log('comments deletion failed')
        res.json({
            success: false
        })
    }

  })
  .catch(function(error) {
    console.log('comments deletion failed')
    res.json({
      success: false
    })
  });
  
})

module.exports = router