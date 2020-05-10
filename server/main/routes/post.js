var express = require('express')
var router = express.Router({ mergeParams: true })

const Post = require('../models/post');

router.post('/', (req, res) => {

  const { post_author, post_text } = req.body;

  Post.create({
    text: post_text,
    author: post_author
  })
  .then(function(post) {
    
    console.log(`post added`)
    res.json({
      success: true,
      post_id: post.dataValues.id,
      post_date: post.dataValues.updatedAt
    })
  })
  .catch(function(error) {
    console.log("create post failed")
    res.json({
      success: false
    })
  });

})

// router.put('/', (req, res) => {

//   const post_id = req.params.id
//   const { post_text } = req.body;

//   Post.update(
//     { text: post_text },
//     { where: { id: post_id },
//     returning: true,
//     plain: true
//   })
//   .then(function(query_result) {
//     res.json({
//       success: true,
//       post_date: query_result[1].dataValues.updatedAt
//     })
//   })
//   .catch(function(err) {
//     res.json({
//       success: false
//     })
//   })

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

        Post.destroy({ where: { id: post_id } })
        .then(row_deleted => {

          //post deleted successfully from db
          if(row_deleted === 1) {
              console.log('post deleted successfully')
          //image deletion from db failed
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

        Post.create({
          text: post_text,
          author: post_author,
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
  Post.findAll({raw: true})
  .then(function (posts) {
    //case 1: there is not record in the db for this user
    if (!posts) {
      res.json({
        success: false
      })

      //case 2: record founded
    } else {

      var posts_array = []

      posts.forEach( post => {
        posts_array.push({
          id: post.id,
          text: post.text,
          author: post.author,
          date: post.updatedAt,
          edited: post.edited
        })
      })
      
      res.json({
        success: true,
        posts: posts_array
      })
      
    }
  })
  .catch(function(error) {
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
    //image deletion from db failed
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
  
})

module.exports = router