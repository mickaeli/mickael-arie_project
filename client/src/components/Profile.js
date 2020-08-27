import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import ProfilePicture from './ProfilePicture';
import ProfileBackground from './ProfileBackground';
import UserDetails from './UserDetails'
import ProfileDetailsFormContainer from './ProfileDetailsFormContainer';
import PersonalWallManager from './PersonalWallManager'

const Profile = () => {

  useEffect(() => {
    document.title = 'Dashboard - Profile'
  }, [])

  const userDetails = JSON.parse(localStorage.getItem('isLoggedIn'))

  return (
    <Container fluid className='account'>
      <Row>
        <Col lg={{ offset: 2, span : 8}}>
          <ProfileBackground />
          <ProfilePicture />
          <UserDetails username={userDetails.username} fullnameTag='h1' fullnameSize='1.5rem' picture={false} description={true} callToServer={true} />
          <ProfileDetailsFormContainer />
        </Col>
      </Row>
      <Row>
        <Col lg={{ offset: 2, span : 8}}>
          <PersonalWallManager />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;