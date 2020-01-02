import React from 'react';
import './Footer.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare, faFacebookSquare, faYoutube } from '@fortawesome/free-brands-svg-icons'
import skateboard_ramps from '../img/Skateboard_ramps.jpg';

const Footer = () => {
  return (
    <footer>
      <Container fluid='true'>
        <Row>
          <Col sm={12} lg={6} xl={{ span: 4, offset: 2 }}>
          <Image src={skateboard_ramps} alt="skateboard ramps" />
            {/* <img src={skateboard_ramps} alt="skateboard ramps"/> */}
          </Col>
          <Col sm={12} lg={6} xl={4}>
            <div className='container-wrapper'>
              <h1>Get in Touch with us</h1>
              <p>Gooder&trade; were made as a final project at Hadassah Academic College, Computer Science department, by Mickael Israel (...) & Arie Noyoz (....)</p>
              <ul>
                <li>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitterSquare} size='3x' aria-hidden="true">
                      <span class="sr-only">Lindekin</span>
                    </FontAwesomeIcon>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookSquare} size='3x' aria-hidden="true">
                      <span class="sr-only">Facebook</span>
                    </FontAwesomeIcon>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} size='3x' aria-hidden="true">
                      <span class="sr-only">Youtube</span>
                    </FontAwesomeIcon>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;