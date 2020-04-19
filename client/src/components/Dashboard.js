import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
//import child from '../img/child.jpg';

import './Dashboard.css';
import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';

class Dashboard extends Component {

  componentDidMount() {
    document.title = 'Gooder - Dashboard'
  }

  render() {
    return (
      <div className='dashboard'>
        <Container>
          <ProfileBackground />
          <ProfilePicture />
        </Container>
      </div>
    );
  }

}

export default Dashboard;