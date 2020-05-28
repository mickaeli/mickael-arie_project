import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Invitations from './Invitations'
import Connections from './Connections'
import OtherUsers from './OtherUsers'

import './Friends.css'

class Friends extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      requestsSent: [],
      requests: [],
      friendsList: [],
      otherUsers: []
    }
  }

  componentDidMount() {
    document.title = 'Dashboard - friends'

    axios.get(`/friends/connections/${this.state.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          requestsSent: res.data.requestsSent,
          requests: res.data.requests,
          friendsList: res.data.friendsList
        })
      }
    })
    .catch(err => {
      console.log("Get users error: ", err);
    });
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
          friendsList: [...this.state.friendsList, senderName]
        })
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
      }

    })
    .catch(err => {
      console.log('reject_request failed');
    })

  }


  getOtherUsers = () => {
    axios.get(`/friends/other_users/${this.state.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          otherUsers: res.data.users
        })
      }
    })
    .catch(err => {
      console.log("Get users error: ", err);
    });
  }

  
  render() {

    return (
      <Container fluid className='friends account'>
        <Row>
          <Col lg={{ offset: 2, span : 8}}>
            <Invitations me={this.state.username} requests={this.state.requests} acceptRequest={this.acceptRequest} rejectRequest={this.rejectRequest} />
            <Connections me={this.state.username} requestsSent={this.state.requestsSent} friendsList={this.state.friendsList} />
            <OtherUsers me={this.state.username} otherUsers={this.state.otherUsers} getOtherUsers={this.getOtherUsers} sendRequest={this.sendRequest} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Friends;