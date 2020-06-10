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
    author: post_author
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
    where: {father_id: -1},   
    order: [
      ['id', 'ASC']
    ],
    raw: true
  })
  .then(function (posts) {

    //case 1: there is no post in the db
    if (posts.length === 0) {
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
  const { post_text, post_author } = req.body;

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

  //create new post in db for update its id to the bigger (in order to move up that post at head of the wall)
  Post.create({
    text: post_text,
    author: post_author,
    edited : true
  })
  .then(function(new_post) {
    
    console.log(`post added`)

    //update comments attached to this post with new id (for father_id column)
    Post.update(
    { father_id: new_post.dataValues.id },
    { where: { father_id: post_id },
      returning: true,
      plain: true
    })
    .then(function(query_result) {
      console.log('comments updated')
      res.json({
        success: true,
        post_id: new_post.dataValues.id,
        post_date: new_post.dataValues.updatedAt
      })
    })
    .catch(function(err) {
      console.log('comments update failed')
      res.json({
        success: true,
        post_id: new_post.dataValues.id,
        post_date: new_post.dataValues.updatedAt
      })
    })

  })
  .catch(function(error) {
    console.log("create post failed")
    res.json({
      success: false
    })
  });
  
})


//delete post and its comments
router.delete('/', (req, res) => {

  const post_id = req.params.id

  Post.destroy({ where: {
      [Sequelize.Op.or]: [{id: post_id}, {father_id: post_id} ]
    } 
    })
  .then(row_deleted => {

    //post deleted successfully from db
    if(row_deleted >= 1) {
      console.log('post with comments deleted successfully')
      res.json({
          success: true
      })
    //post deletion from db failed
    } else {
      console.log('post deletion failed')
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