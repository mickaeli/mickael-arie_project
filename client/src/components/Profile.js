import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';
import UserDetails from './UserDetails'
import ProfileDetailsFormContainer from './ProfileDetailsFormContainer';

const Profile = () => {

  useEffect(() => {
    document.title = 'Dashboard - Profile'
  }, [])

  const userDetails = JSON.parse(localStorage.getItem('isLoggedIn'))

  return (
    <Container fluid className='profile account'>
      <Row>
        <Col lg={{ offset: 3, span : 6}} className='main-container'>
          <ProfileBackground />
          <ProfilePicture />
          <UserDetails username={userDetails.username} fullname='h1' picture={false} description={true} />
          <ProfileDetailsFormContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;