const express = require('express')
const router = express.Router({ mergeParams: true })

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require('../models/user')
const UserDetails = require('../models/userDetails');


router.put('/send_request/:senderName/:receiverName', (req, res) => {

  const senderName = req.params.senderName
  const receiverName = req.params.receiverName
  
  User.update(
    { requests_sent: Sequelize.fn('array_append', Sequelize.col('requests_sent'), receiverName) },
    {where: {username: senderName} }
  )
  .then( () => {
    console.log('updating requests_sent successfully');
  })
  .catch(err => {
    console.log('updating requests_sent failed');
    res.json({
      success: false
    })
  })

  User.update(
    { requests: Sequelize.fn('array_append', Sequelize.col('requests'), senderName) },
    {where: {username: receiverName} }
  )
  .then( () => {
    console.log('updating requests successfully');
    res.json({
      success: true
    })
  })
  .catch(err => {
    console.log('updating requests failed');
    res.json({
      success: false
    })
  })

})


router.put('/accept_request/:senderName/:receiverName', (req, res) => {

  const senderName = req.params.senderName
  const receiverName = req.params.receiverName
  
  User.update(
    { requests: Sequelize.fn('array_remove', Sequelize.col('requests'), senderName),
      friends_list: Sequelize.fn('array_append', Sequelize.col('friends_list'), senderName)
    },
    {where: {username: receiverName} }
  )
  .then( () => {
    console.log('updating friends_list in receiver successfully');
  })
  .catch(err => {
    console.log('updating friends_list failed');
    res.json({
      success: false
    })
  })

  User.update(
    { requests_sent: Sequelize.fn('array_remove', Sequelize.col('requests_sent'), receiverName),
      friends_list: Sequelize.fn('array_append', Sequelize.col('friends_list'), receiverName)
    },
    {where: {username: senderName} }
  )
  .then( () => {
    console.log('updating friends_list in sender successfully');
    res.json({
      success: true
    })
  })
  .catch(err => {
    console.log('updating friends_list failed');
    res.json({
      success: false
    })
  })

})


router.put('/reject_request/:senderName/:receiverName', (req, res) => {

  const senderName = req.params.senderName
  const receiverName = req.params.receiverName
  
  User.update(
    { requests_sent: Sequelize.fn('array_remove', Sequelize.col('requests_sent'), receiverName) },
    {where: {username: senderName} }
  )
  .then( () => {
    console.log('updating requests_sent successfully');
  })
  .catch(err => {
    console.log('updating requests_sent failed');
    res.json({
      success: false
    })
  })

  User.update(
    { requests: Sequelize.fn('array_remove', Sequelize.col('requests'), senderName) },
    {where: {username: receiverName} }
  )
  .then( () => {
    console.log('updating requests successfully');
    res.json({
      success: true
    })
  })
  .catch(err => {
    console.log('updating requests failed');
    res.json({
      success: false
    })
  })

})


router.put('/delete_friend/:username/:friendName', (req, res) => {

  const username = req.params.username
  const friendName = req.params.friendName
  
  User.update(
    { friends_list: Sequelize.fn('array_remove', Sequelize.col('friends_list'), friendName) },
    {where: {username: username} }
  )
  .then( () => {
    console.log('updating friends_list 1 successfully');
  })
  .catch(err => {
    console.log('updating friends_list 1 failed');
    res.json({
      success: false
    })
  })

  User.update(
    { friends_list: Sequelize.fn('array_remove', Sequelize.col('friends_list'), username) },
    {where: {username: friendName} }
  )
  .then( () => {
    console.log('updating friends_list 2 successfully');
    res.json({
      success: true
    })
  })
  .catch(err => {
    console.log('updating friends_list 2 failed');
    res.json({
      success: false
    })
  })

})


router.get('/other_users/:username', (req, res) => {

  const username = req.params.username

  User.findOne({ where: { username: username } })
  .then( user => {

    //case 1: there is not record in the db for this user
    if (!user) {
      res.json({
        success: false
      })

      //case 2: record founded
    } else {

      user = user.dataValues
      let links_array = user.requests_sent.concat(user.requests, user.friends_list)
      links_array.push(username)

      User.findAll({
        where: {
          username: {[Op.notIn]: links_array}
        },
        attributes: ['username'],
        raw: true
      })
      .then( users => {

        //case 1: there is no user in the db
        if (!users) {
          res.json({
            success: false
          })

          //case 2: record founded
        } else {

          console.log("users found")
          
          const users_names = users.map(user => user.username)
          
          res.json({
            success: true,
            users: users_names
          })
          
        }
      })
      .catch(err => {
        console.log('users search failed')
        res.json({
          success: false
        })
      });

    }
  })
  .catch(err => {
    res.json({
      success: false
    })
  });

})


router.get('/connections/:username', (req, res) => {

  const username = req.params.username

  User.findOne({ where: { username: username } })
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
      res.json({
        success: true,
        requestsSent: user.dataValues.requests_sent,
        requests: user.dataValues.requests,
        friendsList: user.dataValues.friends_list
      })

    }
  })
  .catch(err => {
    console.log('user search failed');
    res.json({
      success: false
    })
  });

})

module.exports = router