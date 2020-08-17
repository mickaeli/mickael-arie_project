var express = require('express')
var router = express.Router()

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Post = require('../models/post');

router.get('/', (req, res) => {

  const username = req.query.username
  const toSearch = req.query.search.toUpperCase() //convert the string to upper case for search is case insensitive

  searchResultsInUsers(username, toSearch, users => {

    searchResultsInPosts(username, toSearch, posts => {

      console.log('----', users, posts)

      res.json({
        success: true,
        users,
        posts
      })
    })

  })

})


//help functions

const searchResultsInUsers = (username, toSearch, cb) => {

  UserDetails.findAll({
    where: {username: {[Op.not]: username}}, 
    attributes: ['username', 'fullname', 'description'], 
    raw: true
  })
  .then(users => {

    //case 1: there is no comments for this post
    if (users.length === 0) {
      console.log("no user found")
      res.json({
        success: false
      })
      //case 2: record founded
    } else {
      console.log("users found")

      let usersResult = []

      //Look for the string (in toSearch variable) in each record in users.
      //Each record fit to the search string is added (only the 'username 'field) to the 'usersResult' variable.
      const regex = new RegExp("\\b" + toSearch + "\\b", "i");

      users.forEach(user => {
        if(regex.test(user.username) || regex.test(user.fullname) || regex.test(user.description)){
          usersResult.push(user.username)
        }
      });

      //get the record of current user in User table model.
      User.findOne({ 
        where: { username: username }, 
        raw: true 
      })
      .then( user => {

        //case 1: there is not record in the db for this user
        if (!user) {
          console.log('user not found');
          res.json({
            success: false
          })

          //case 2: record founded
        } else {
          console.log('user found');

          let requestsSent, requests, friendsList, otherUsers;

          //get the intersection between two arrays.
          const users = {
            requestsSent: getArraysIntersection(usersResult, user.requests_sent),
            requests: getArraysIntersection(usersResult, user.requests),
            friendsList: getArraysIntersection(usersResult, user.friends_list),
            otherUsers: getArraysDifference(usersResult, user.requests_sent.concat(user.requests).concat(user.friends_list))
          }
          

          cb(users)

          /* res.json({
            success: true,
            data: {
              requestsSent,
              requests,
              friendsList,
              otherUsers
            }
          }) */

        }
      })
      .catch(err => {
        console.log('user search failed');
        res.json({
          success: false
        })
      });
      
    }
  })
  .catch(error => {
    console.log('users search failed')
    res.json({
      success: false
    })
  });
}

const getArraysIntersection = (arr1, arr2) => {
  return arr1.filter(element => arr2.includes(element))
}

const getArraysDifference = (arr1, arr2) => {
  return arr1.filter(element => !arr2.includes(element))
}

const searchResultsInPosts = (username, toSearch, cb) => {

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

      let postsResult = []

      //Look for the string (in toSearch variable) in each record in posts and and only in 'text', 'author' and 'fullname' fields.
      //Each record fit to the search string is added to the 'postsResult' variable.
      const regex = new RegExp("\\b" + toSearch + "\\b", "i");

      posts.forEach(post => {
        if(regex.test(post.text) || (((regex.test(post.author) || regex.test(post['user.users_detail.fullname'])) && (!post.is_anonymous || post.author === username)))){
          postsResult.push({
            id: post.id,
            text: post.text,
            profilePicture: post['user.users_detail.url_picture'],
            authorUsername: post.author,
            authorFullname: post['user.users_detail.fullname'],
            edited: post.edited,
            date: post.updatedAt,
            isAnonymous: post.is_anonymous
          })
        }
      });
      
      cb(postsResult)
      
    }
  })
  .catch(error => {
    console.log('posts search failed')
    res.json({
      success: false
    })
  });

}


module.exports = router