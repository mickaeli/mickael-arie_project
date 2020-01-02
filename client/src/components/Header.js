import React from 'react';
import './Header.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../img/logo.png';

const Header = () => {
  return (
    <header>
      <Container fluid='true'>
        <Row>
          <Col xs={12} sm={6} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 2 }}>
            <a href="index.html" class="logo"><img src={logo} alt="Gooder - social network for good actions" /></a>
            <nav class="main-nav">
              <ul>
                <li><a href="https://www.linkedin.com">Home</a></li>
                <li><a href="https://www.linkedin.com">About</a></li>
                {/* <li class="current"><a href="about.html">אודות</a></li> */}
              </ul>
            </nav>
          </Col >
          <Col xs={12} sm={6} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 2 }}>
            <div className='buttons'>
              <Button className='button' href="#" variant="outline-light" size="sm">Sign In</Button>
              <Button className='button' href="#" variant="primary" size="sm">Sign Up</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;