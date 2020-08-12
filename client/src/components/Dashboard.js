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
        <Col lg={{ offset: 2, span : 8}}>
          <ProfileBackground />
          <ProfilePicture />
          <UserDetails username={userDetails.username} fullnameTag='h1' fullnameSize='1.5rem' picture={false} description={true} callToServer={true} />
          <WallManager />
        </Col>
      </Row>
    </Container>
  );

}

export default Dashboard;
