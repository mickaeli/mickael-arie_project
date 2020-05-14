var express = require('express')
var router = express.Router({ mergeParams: true })
var Sequelize = require('sequelize');

const Post = require('../models/post');
const User = require('../models/user');
const UserDetails = require('../models/userDetails');

router.post('/', (req, res) => {

  const { post_text, post_author } = req.body;

  Post.create({
    text: post_text,
    author: post_author,
    is_post: true //delete
  })
  .then(function(post) {
    res.json({
      success: true,
      post_id: post.dataValues.id,
      post_date: post.dataValues.updatedAt
    })

  })
  .catch(function(error) {
    console.log(error)
    console.log("create post failed")
    res.json({
      success: false
    })
  });

})


router.get('/', (req, res) => {

  Post.findAll({
    include: [{
      model: User,
      required: true,
      include: [{model: UserDetails, required: true }]
     }],
    where: {is_post: true},   
    order: [
      ['id', 'ASC']
    ],
    raw: true
  })
  .then(function (posts) {

    //case 1: there is no post in the db
    if (!posts) {
      console.log("no post found")
      res.json({
        success: false
      })

      //case 2: record founded
    } else {

      console.log("posts found")

      var posts_array = []

      posts.forEach( post => {
        posts_array.push({
          id: post.id,
          text: post.text,
          author: post['user.users_detail.fullname'],
          edited: post.edited,
          comments_id: post.comments_id ? post.comments_id : [], //delete
          date: post.updatedAt
        })
      })
      
      res.json({
        success: true,
        posts: posts_array
      })
      
    }
  })
  .catch(function(error) {
    console.log('post search failed')
    res.json({
      success: false
    })
  });

})


router.put('/', (req, res) => {

  const post_id = req.params.id
  const { post_text } = req.body;

  Post.findOne({ 
    where: { id: post_id },
    raw : true
   })
    .then(function (post) {

      //case 1: post not founded
      if (!post) {
        console.log("post not found")
        res.json({
          success: false
        })
        //case 2: post founded
      } else {
        console.log("post found")

        var post_author = post.author
        var comments_id = post.comments_id

        //delete post from db for create a new post later
        Post.destroy({ where: { id: post_id } })
        .then(row_deleted => {

          //post deleted successfully from db
          if(row_deleted === 1) {
              console.log('post deleted successfully')
          //post deletion from db failed
          } else {
              console.log('post deleted failed')
              res.json({
                  success: false
              })
          }

        })
        .catch(function(error) {
          res.json({
            success: false
          })
        });

        //create new post in db for upadte its id to the bigger (in order to move up that post at head of the wall)
        Post.create({
          text: post_text,
          author: post_author,
          comments_id: comments_id,
          is_post: true,
          edited : true
        })
        .then(function(new_post) {
          
          console.log(`post added`)
          res.json({
            success: true,
            post_id: new_post.dataValues.id,
            post_date: new_post.dataValues.updatedAt
          })
        })
        .catch(function(error) {
          console.log("create post failed")
          res.json({
            success: false
          })
        });

      }
    })
    .catch(function(error) {
      console.log("post search failed")
      res.json({
        success: false
      })
		});
})


router.delete('/', (req, res) => {

  const post_id = req.params.id

  Post.destroy({ where: { id: post_id } })
  .then(row_deleted => {

    //post deleted successfully from db
    if(row_deleted === 1) {
      console.log('post deleted successfully')
      res.json({
          success: true
      })
    //post deletion from db failed
    } else {
      console.log('post deleted failed')
      res.json({
          success: false
      })
    }

  })
  .catch(function(error) {
    console.log('post deletion failed')
    res.json({
      success: false
    })
  });
  
})

module.exports = router