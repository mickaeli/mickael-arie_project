import React from 'react';
import './Footer.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Skateboard_ramps from '../img/Skateboard_ramps.jpg';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <img src={Skateboard_ramps} alt="Skateboard ramps"/>
          </Col>
          <Col sm={12} md={6}>
            <div className='container-wrapper'>
              <h1>Get in Touch with us</h1>
              <p>Gooder™ were made as a final project at Hadassah Academic College, Computer Science department, by Mickael Israel (...) & Arie Noyoz (....)</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;