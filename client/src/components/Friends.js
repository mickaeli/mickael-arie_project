import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'

import './Friends.css'

import Friend from './Friend'

class Friends extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    document.title = 'Dashboard - friends'
  }

  getUsers = () => {
    axios.get('/profile_details')
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          users: res.data.users
        })
      }
    })
    .catch(err => {
      console.log("Get users error: ", err);
    });
  }
  
  render() {


    const users = this.state.users.map(user => {
      return <Friend 
        key={user.id} 
        data={user}  
      />
    })



    return (
      <Container fluid className='friends account'>
        <Row>
          <Col lg={{ offset: 2, span : 8}}>
            <h1>Invitations</h1>
            <h1>Connections</h1>
            <div className='wrapper-button'>
              <Button
                className='button'
                variant="primary"
                onClick={this.getUsers}
                >Click here to add a new friend
              </Button>
            </div>
            <div className='users'>
              {users}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Friends;