import React, { useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import './NotFound.css'

const NotFound = () => {

  useEffect(() => {
    document.title = 'Gooder'
  }, [])

  return (
    <Container fluid className= 'not-found'>
      <Row>
        <Col md={12} lg={{ span: 8, offset: 2 }}>
          <h1>Page Not Found</h1>
          <div>
            <p>We couldn't find what you were looking for.</p>
            <p>Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;