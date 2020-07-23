import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import axios from 'axios';

import './Dashboard.css';

import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';
import WallManager from './WallManager'

import { AccountContext } from '../Context'

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profile_description: ""
    };
  }

  componentDidMount() {
    document.title = 'Gooder - Dashboard'
    
    axios.get(`/profile_description/${this.context.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          profile_description: res.data.description
        })
      }
    })
    .catch(err => {
      console.log("Get data error: ", err);
    });
  }

  render() {
    return (
      <Container fluid className='account'>
        <Row>
          <Col lg={{ offset: 2, span : 8}} className='main-container'>
            <ProfileBackground />
            <ProfilePicture />
            <div className="profile-details">
              <h1>{this.context.fullname}</h1>
              <p>{this.state.profile_description}</p>
            </div>
            <WallManager />
          </Col>
        </Row>
      </Container>
    );
  }

}

Dashboard.contextType = AccountContext;

export default Dashboard;
