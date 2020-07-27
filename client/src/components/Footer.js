import React from 'react';
import {withRouter} from 'react-router-dom';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare, faFacebookSquare, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import skateboard_ramps from '../img/skateboard_ramps.jpg';

import './Footer.css';

const Footer = () => {

  const details_connection = JSON.parse(localStorage.getItem('isLoggedIn'))

  if( details_connection && details_connection.value) return null;

  return (
    <footer style={{ backgroundColor : (details_connection && details_connection.value) ? 'rgb(91, 189, 239)' : 'rgb(35, 34, 34)' }}>
      <Container fluid>
        <Row>
          <Col sm={12} lg={6} xl={{ span: 4, offset: 2 }}>
          <Image src={skateboard_ramps} alt="skateboard ramps" />
          </Col>
          <Col sm={12} lg={6} xl={4}>
            <div className='container-wrapper'>
              <h1>Get in Touch with us</h1>
              <p>Gooder&trade; were made as a final project at Hadassah Academic College, Computer Science department, by Mickael Israel (...) & Arie Noyoz (....)</p>
              <ul className="features">
                <li>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitterSquare} size='3x' aria-hidden="true">
                      <span className="sr-only">Lindekin</span>
                    </FontAwesomeIcon>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookSquare} size='3x' aria-hidden="true">
                      <span className="sr-only">Facebook</span>
                    </FontAwesomeIcon>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size='3x' aria-hidden="true">
                      <span className="sr-only">Linkedin</span>
                    </FontAwesomeIcon>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} size='3x' aria-hidden="true">
                      <span className="sr-only">Youtube</span>
                    </FontAwesomeIcon>
                  </a>
                </li>
              </ul>
              <a className="mail" href="mailto:mickaelisrael26@gmail.com">mickaelisrael26@gmail.com </a>
              <a className="mail" href="mailto:arienoy@gmail.com">arienoy@gmail.com </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default  withRouter(Footer);