import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'

import Invitations from './Invitations'
import Connections from './Connections'
import OtherUsers from './OtherUsers'

import { AccountContext } from '../Context'

import './Friends.css'

class Friends extends Component {

  constructor(props) {
    super(props);

    this.state = {
      requestsSent: [],
      requests: [],
      otherUsers: [],
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn')),
      clickOnButton: false,
      textIfNonOtherUsers: ''
    }
  }

  componentDidMount() {
    document.title = 'Dashboard - Friends'

    this.setSocketEvents()

    axios.get(`/friends/connections/${this.state.userDetails.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          requestsSent: res.data.requestsSent,
          requests: res.data.requests
        })
      }
    })
    .catch(err => {
      console.log("Get users error: ", err);
    });
  }

  setSocketEvents = () => {

    this.context.socket.on('newUser', ({user}) => {
      if(this.state.clickOnButton){
        this.setState({
          otherUsers: [...this.state.otherUsers, user]
        })
      }
      
    })

    this.context.socket.on('newFriend', ({sender, receiver}) => {

      if(receiver === this.state.userDetails.username){
        
        this.setState({
          requestsSent: this.state.requestsSent.filter(user => {
                          return user !== sender
                        })
        })

        this.context.setFriends([...this.context.friends, sender])
      }
    })

    this.context.socket.on('ignoreRequest', ({sender, receiver}) => {

      if(receiver === this.state.userDetails.username){
        this.setState({
          requestsSent: this.state.requestsSent.filter(user => {
                          return user !== sender
                        })
        })

        if(this.state.clickOnButton){
          this.setState({
            otherUsers: [...this.state.otherUsers, sender]
          })
        }
      }
    })

    this.context.socket.on('newRequest', ({sender, receiver}) => {

      if(receiver === this.state.userDetails.username){

        this.setState({
          otherUsers: this.state.otherUsers.filter(user => {
                          return user !== sender
                        }),
          requests: [...this.state.requests, sender]
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
          })
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
          })
        })

        if(this.state.clickOnButton){
          this.setState({
            otherUsers: [...this.state.otherUsers, senderName]
          })
        }

        this.context.socket.emit('ignoreRequest', { sender: receiverName, receiver: senderName } )
      }

    })
    .catch(err => {
      console.log('reject_request failed');
    })

  }


  getOtherUsers = () => {
    axios.get(`/friends/other_users/${this.state.userDetails.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          otherUsers: res.data.users
        })
        if(res.data.users.length === 0){
          this.setState({
            textIfNonOtherUsers: 'No other users exist'
          })
        }
      }
    })
    .catch(err => {
      console.log("Get users error: ", err);
    });

    this.setState({clickOnButton: true})
  }

  
  render() {

    return (
      <Container fluid className='friends account'>
        <Row>
          <Col lg={{ offset: 2, span : 8}}>
            {
              (this.state.requestsSent.length === 0 && this.state.requests.length === 0 && this.context.friends.length === 0 && this.state.otherUsers.length === 0) &&
              <p style={ {textAlign: 'center', fontSize: '1.1rem' } }>You have no friends yet. Do you want to connect to a new friend ?</p>
            }
            
            {
              this.state.requests.length > 0 &&
              <Invitations requests={this.state.requests} acceptRequest={this.acceptRequest} rejectRequest={this.rejectRequest} />
            }

            {
              (this.context.friends.length > 0 || this.state.requestsSent.length > 0) &&
              <Connections requestsSent={this.state.requestsSent} friends={this.context.friends} />
            }
            <div className='wrapper-button'>
              <Button
                className='button'
                variant="primary"
                onClick={this.getOtherUsers}
                >Click here to add a new friend
              </Button>
            </div> 
            {this.state.clickOnButton ?
             (this.state.otherUsers.length > 0 ?
              <OtherUsers otherUsers={this.state.otherUsers} sendRequest={this.sendRequest} />
            :
             (<p className='text-center'>{this.state.textIfNonOtherUsers}</p>)) 
              : null
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

Friends.contextType = AccountContext;

export default Friends;