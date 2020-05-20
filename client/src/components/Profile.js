import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import axios from 'axios';

import './Profile.css';
import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';
import ProfileDetailsFormContainer from './ProfileDetailsFormContainer';

class Profile extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      fullname: "",
      profile_description: ""
    };
  }

  componentDidMount() {
    document.title = 'Dashboard - profile'

    const fullname = JSON.parse(localStorage.getItem('isLoggedIn')).fullname
    this.setState({
      fullname
    })

    axios.get(`/profile_description/${this.state.username}`)
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
          <Col lg={{ offset: 3, span : 6}}>
            <ProfileBackground />
            <ProfilePicture />
            <h1>{this.state.fullname}</h1>
            <p>{this.state.profile_description}</p>
            <ProfileDetailsFormContainer
              username={this.state.username}
            />
          </Col>
        </Row>
      </Container>
		);
	}
}

export default Profile;