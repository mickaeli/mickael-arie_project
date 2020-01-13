import React from 'react';
import './Header.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../img/logo.png';

const Header = () => {
  return (
    <header>
      <Container fluid='true'>
        <Row>
          <Col xs={12} sm={4} lg={{ span: 3, offset: 2 }} xl={{ span: 2, offset: 1 }}>
            <a href="index.html" class="logo"><img src={logo} alt="Gooder - social network for good actions" /></a>
          </Col> 
          <Col xs={12} sm={3} lg={1} xl={3}>
            <nav class="main-nav">
              <ul>
                <li><a href="https://www.linkedin.com">Home</a></li>
                <li><a href="https://www.linkedin.com">About</a></li>
              </ul>
            </nav>
          </Col>
          <Col xs={12} sm={{ span: 3, offset: 2 }} lg={{ span: 2, offset: 2 }} xl={{ span: 3, offset: 2 }}>
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