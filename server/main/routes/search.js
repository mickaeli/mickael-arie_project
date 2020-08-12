var express = require('express')
var router = express.Router()

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const { request } = require('express');

router.get('/', (req, res) => {

  const username = req.query.username
  const toSearch = req.query.search.toUpperCase() //convert the string to upper case for search is no case sensitive

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

      //Look for the string (in toSearch variable) in each record in users and only in 'fullname' and 'description' fields.
      //Each record (only the 'username 'field) fit to the search string is added to the 'usersResult' variable.
      const regex = new RegExp("\\b" + toSearch + "\\b", "i");

      users.forEach(user => {
        if(regex.test(user.fullname) || regex.test(user.description)){
          usersResult.push(user.username)
        }
      });
      
      /* users.forEach(user => {
        if(user.fullname.toUpperCase().includes(toSearch) || user.description.toUpperCase().includes(toSearch)){
          usersResult.push(user.username)
        }
      }); */

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

          let requestsSent, requests, friendsList;

          //get the intersection between two arrays.
          requestsSent = arraysIntersection(usersResult, user.requests_sent)
          requests = arraysIntersection(usersResult, user.requests)
          friendsList = arraysIntersection(usersResult, user.friends_list)
          otherUsers = arraysDifference(usersResult, user.requests_sent.concat(user.requests).concat(user.friends_list))

          res.json({
            success: true,
            data: {
              requestsSent: requestsSent,
              requests: requests,
              friendsList: friendsList,
              otherUsers: otherUsers
            }
          })
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


})

const arraysIntersection = (arr1, arr2) => {
  return arr1.filter(element => arr2.includes(element))
}

const arraysDifference = (arr1, arr2) => {
  return arr1.filter(element => !arr2.includes(element))
}


module.exports = router