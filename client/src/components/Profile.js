import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import axios from 'axios';

import './Profile.css';
import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';
import ProfileDetailsFormContainer from './ProfileDetailsFormContainer';

import { AccountContext } from '../Context'

class Profile extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      profile_description: ""
    };
  }

  componentDidMount() {
    document.title = 'Dashboard - profile'

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
			<Container fluid className='profile account'>
        <Row>
          <Col lg={{ offset: 3, span : 6}} className='main-container'>
            <ProfileBackground />
            <ProfilePicture />
            <div className="profile-details">
              <h1>{this.context.fullname}</h1>
              <p>{this.state.profile_description}</p>
            </div>
            <ProfileDetailsFormContainer />
          </Col>
        </Row>
      </Container>
		);
	}
}

Profile.contextType = AccountContext;

export default Profile;