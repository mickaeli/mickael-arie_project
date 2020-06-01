import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import axios from 'axios';

import './Dashboard.css';
import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';
import Wall from './Wall'

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      fullname: "",
      profile_description: ""
    };
  }

  componentDidMount() {
    document.title = 'Gooder - Dashboard'

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
      <Container fluid className='dashboard account'>
        <Row>
          <Col lg={{ offset: 3, span : 6}} className='main-container'>
	          <ProfileBackground />
            <ProfilePicture />
            <div className="profile-details">
              <h1>{this.state.fullname}</h1>
              <p>{this.state.profile_description}</p>
            </div>
            <Wall fullname={this.state.fullname} />
          </Col>
        </Row>
      </Container>
    );
  }

}

export default Dashboard;
