import React from 'react';
import './DescSection2.css';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import under_gallerie from '../img/underground_gallery.jpg';

const DescSection2 = () => {
  return (
    <Container fluid='true'>
      <div className='desc-section2'>
          <Row>
            <Col sm={12} lg={6} xl={{ span: 4, offset: 2 }}>
              <Image src={under_gallerie} alt="underground gallery" />
              {/* <img src={under_gallerie} alt="underground gallery"/> */}
            </Col>
            <Col sm={12} lg={6} xl={4}>
              <div className='container-wrapper'>
                <h1>So.. who we are and what are we all about?</h1>
                <p>Gooder&trade; is a social network for good-doing & good causes. 
                  Whether you need help, have something to offer or run a charity organization - 
                  Gooder&trade; is the place for you. After logging in, you'll be able to build a personal 
                  or organizational profile page, connect with others, socialize and make good. 
                  Gooder&trade; is the best place for anyone interested in asking for or doing good actions, 
                  gathering around good causes, getting to know people & help. </p>
                <p>Gooder&trade; were made as a final project at Hadassah Academic College, Computer Science department.</p>
                <Button className='button' href="#" variant="outline-dark" size="lg">Learn more</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
  );
};

export default DescSection2;