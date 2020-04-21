import React, { Component } from 'react';
import { Container } from 'react-bootstrap'

import axios from 'axios';

import './Dashboard.css';
import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      fullname: null,
      profile_description: null
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
      console.log("Upload data error: ", err);
    });
  }

  render() {
    return (
        <Container className='dashboard'>
          <ProfileBackground />
          <ProfilePicture />
          <h1>{this.state.fullname}</h1>
          <p>{this.state.profile_description}</p>
        </Container>
    );
  }

}

export default Dashboard;