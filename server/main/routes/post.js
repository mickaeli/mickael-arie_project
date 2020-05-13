var express = require('express')
var router = express.Router({ mergeParams: true })
var Sequelize = require('sequelize');

const Post = require('../models/post');


router.post('/', (req, res) => {

  const { post_text, post_author } = req.body;

  Post.create({
    text: post_text,
    author: post_author,
    is_post: true
  })
  .then(function(post) {

    // if(post_id !== '') {
    //   Post.update(
    //     { comments_id: Sequelize.fn('array_append', Sequelize.col('comments_id'), post.dataValues.id) },
    //     { where: { id: post_id },
    //     returning: true,
    //     plain: true
    //   })
    //   .then(function(query_result) {
    //     console.log('father post updated')
    //     res.json({
    //       success: true,
    //       post_id: post.dataValues.id,
    //       post_date: post.dataValues.updatedAt
    //     })
    //   })
    //   .catch(function(err) {
    //     console.log('father post update failed')
    //     res.json({
    //       success: false
    //     })
    //   })
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

// router.put('/', (req, res) => {

//   const post_id = req.params.id
//   const { post_text } = req.body;

  // Post.update(
  //   { text: post_text },
  //   { where: { id: post_id },
  //   returning: true,
  //   plain: true
  // })
  // .then(function(query_result) {
  //   res.json({
  //     success: true,
  //     post_date: query_result[1].dataValues.updatedAt
  //   })
  // })
  // .catch(function(err) {
  //   res.json({
  //     success: false
  //   })
  // })

// })

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

router.get('/', (req, res) => {

    Post.findAll({
      // include: [{
      //   model: User,
      //   required: true
      //  }],
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
            author: post.author,
            edited: post.edited,
            comments_id: post.comments_id ? post.comments_id : [],
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

    //the request come from post that require comments attached of it
  //   else {

  //   Post.findAll({
  //     where: {id: post_ids},
  //     order: [
  //       ['id', 'ASC']
  //     ],
  //     raw: true
  //   })
  //   .then(function (comments) {
  //     //case 1: there is no comments for this post
  //     if (!comments) {
  //       console.log("no comment found")
  //       res.json({
  //         success: false
  //       })

  //       //case 2: record founded
  //     } else {

  //       console.log("comments found")

  //       var comments_array = []

  //       comments.forEach( comment => {
  //         comments_array.push({
  //           id: comment.id,
  //           text: comment.text,
  //           author: comment.author,
  //           date: comment.updatedAt
  //         })
  //       })
        
  //       res.json({
  //         success: true,
  //         comments: comments_array
  //       })
        
  //     }
  //   })
  //   .catch(function(error) {
  //     console.log('comment search failed')
  //     res.json({
  //       success: false
  //     })
  //   });

  // }

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