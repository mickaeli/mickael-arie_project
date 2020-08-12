import React, { Component } from 'react';
import axios from 'axios'

import { Container, Row, Col } from 'react-bootstrap'

import Invitations from './Invitations'
import Connections from './Connections'
import OtherUsers from './OtherUsers'

import { AccountContext } from '../Context'

import './Friends.css'

class FriendsResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      friends: props.data.friendsList,
      requestsSent: props.data.requestsSent,
      requests: props.data.requests,
      otherUsers: props.data.otherUsers,
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
    }
  }

  componentDidMount() {
    this.setSocketEvents()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props){
      this.setState({
        friends: this.props.data.friendsList,
        requestsSent: this.props.data.requestsSent,
        requests: this.props.data.requests,
        otherUsers: this.props.data.otherUsers
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
  
  render() {

    return (
      <Container fluid className='friends account'>
        <Row>
          <Col lg={{ offset: 2, span : 8}}>
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
              <Connections requestsSent={this.state.requestsSent} friends={this.state.friends} />
            }

            {
              this.state.otherUsers.length > 0 &&
              <OtherUsers otherUsers={this.state.otherUsers} sendRequest={this.sendRequest} />
            }
            
          </Col>
        </Row>
      </Container>
    );
  }
}

FriendsResults.contextType = AccountContext;

export default FriendsResults;