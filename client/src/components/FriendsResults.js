import React, { Component } from 'react';
import axios from 'axios'

import Invitations from './Invitations'
import Connections from './Connections'
import OtherUsers from './OtherUsers'

import { AccountContext } from '../Context'

import './FriendsResults.css'

class FriendsResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      friends: props.users.friendsList,
      requestsSent: props.users.requestsSent,
      requests: props.users.requests,
      otherUsers: props.users.otherUsers,
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
    }
  }

  componentDidMount() {
    this.setSocketEvents()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props){
      this.setState({
        friends: this.props.users.friendsList,
        requestsSent: this.props.users.requestsSent,
        requests: this.props.users.requests,
        otherUsers: this.props.users.otherUsers
      })
    }
  }
  
  

  setSocketEvents = () => {

    this.context.socket.on('newFriend', ({sender, receiver}) => {

      if(receiver === this.state.userDetails.username && this.state.requestsSent.includes(sender)){

        this.setState({
          requestsSent: this.state.requestsSent.filter(user => {
                          return user !== sender
                        }),
          friends: [...this.state.friends, sender]
        })

        this.context.setFriends([...this.context.friends, sender])
      }
    })

    this.context.socket.on('deleteFriend', ({sender, receiver}) => {

      if(receiver === this.state.userDetails.username && this.state.friends.includes(sender)){

        this.context.setFriends(this.context.friends.filter(user => {
                                  return user !== sender
                                }))

        this.setState({
          friends: this.state.friends.filter(user => {
            return user !== sender
          }),
          otherUsers: [...this.state.otherUsers, sender]
        })
      }

    })

    this.context.socket.on('ignoreRequest', ({sender, receiver}) => {

      if(receiver === this.state.userDetails.username && this.state.requestsSent.includes(sender)){
        this.setState({
          requestsSent: this.state.requestsSent.filter(user => {
                          return user !== sender
                        }),
          otherUsers: [...this.state.otherUsers, sender]  
        })
      }
    })

    this.context.socket.on('newRequest', ({sender, receiver}) => {

      if(receiver === this.state.userDetails.username && this.state.otherUsers.includes(sender)){

        this.setState({
          requests: [...this.state.requests, sender],
          otherUsers: this.state.otherUsers.filter(user => {
                      return user !== sender
                    })
        })
      }
    })

  }

  sendRequest = (senderName, receiverName) => {

    axios.put(`/friends/send_request/${senderName}/${receiverName}`)
    .then(res => {
      if (res.data.success === true) {

        this.setState({
          otherUsers: this.state.otherUsers.filter(user => {
            return user !== receiverName
          }),
          requestsSent: [...this.state.requestsSent, receiverName]
        })

        this.context.socket.emit('sendRequest', { sender: senderName, receiver: receiverName } )
      }

    })
    .catch(err => {
      console.log('send_request failed');
    })

  }


  acceptRequest = (senderName, receiverName) => {

    axios.put(`/friends/accept_request/${senderName}/${receiverName}`)
    .then(res => {
      if (res.data.success === true) {

        this.setState({
          requests: this.state.requests.filter(user => {
            return user !== senderName
          }),
          friends: [...this.state.friends, senderName]
        })

        this.context.setFriends([...this.context.friends, senderName])

        this.context.socket.emit('connectToNewFriend', { sender: receiverName, receiver: senderName } )
      }

    })
    .catch(err => {
      console.log('accept_request failed');
    })

  }


  rejectRequest = (senderName, receiverName) => {

    axios.put(`/friends/reject_request/${senderName}/${receiverName}`)
    .then(res => {
      if (res.data.success === true) {

        this.setState({
          requests: this.state.requests.filter(user => {
            return user !== senderName
          }),
          otherUsers: [...this.state.otherUsers, senderName]
        })

        this.context.socket.emit('ignoreRequest', { sender: receiverName, receiver: senderName } )
      }

    })
    .catch(err => {
      console.log('reject_request failed');
    })

  }

  deleteFriend = friend => {

    axios.put(`/friends/delete_friend/${this.state.userDetails.username}/${friend}`)
    .then(res => {
      if (res.data.success === true) {

        this.context.socket.emit('deleteFriend', { sender: this.state.userDetails.username, receiver: friend } )
      }

    })
    .catch(err => {
      console.log('deleteFriend failed');
    })

  }
  
  render() {

    return (
      <div className='friends-results account'>
        <h1 className='text-center green-color' style={{fontWeight: 600}}>Friends</h1>
            {
              (this.state.requestsSent.length === 0 && this.state.requests.length === 0 && this.state.friends.length === 0 && this.state.otherUsers.length === 0) &&
              <p style={ {textAlign: 'center', fontSize: '1.1rem' } }>No results</p>
            }
            
            {
              this.state.requests.length > 0 &&
              <Invitations requests={this.state.requests} acceptRequest={this.acceptRequest} rejectRequest={this.rejectRequest} />
            }

            {
              (this.state.friends.length > 0 || this.state.requestsSent.length > 0) &&
              <Connections requestsSent={this.state.requestsSent} friends={this.state.friends} deleteFriend={this.deleteFriend}/>
            }

            {
              this.state.otherUsers.length > 0 &&
              <OtherUsers otherUsers={this.state.otherUsers} sendRequest={this.sendRequest} />
            }
      </div>
    );
  }
}

FriendsResults.contextType = AccountContext;

export default FriendsResults;