import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';
import WallManager from './WallManager'
import UserDetails from './UserDetails';

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Gooder - Dashboard'
  }, [])

  const userDetails = JSON.parse(localStorage.getItem('isLoggedIn'))

  return (
    <Container fluid className='account'>
      <Row>
        <Col lg={{ offset: 2, span : 8}} className='main-container'>
          <ProfileBackground />
          <ProfilePicture />
          <UserDetails username={userDetails.username} fullname='h1' picture={false} description={true} />
          <WallManager />
        </Col>
      </Row>
    </Container>
  );

}

export default Dashboard;
