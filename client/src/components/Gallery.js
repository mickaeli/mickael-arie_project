import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GalleryItem from './GalleryItem';
import './Gallery.css';
import child from '../img/child.jpg';
import children from '../img/children.jpg';
import children_holding_hands from '../img/children_holding_hands.jpg';

const Gallery = () => {
  return (
    <Container className='gallery'>
        <Row>
          <Col md={12} lg={4}>
            <GalleryItem 
              header='Create account'
              paragraph='Create your own personal space - personal or organizational. Add content, publish your thoughts and have fun!'
              url_img={child} 
            />
          </Col>
          <Col md={12} lg={4}>
            <GalleryItem 
              header='Socialize'
              paragraph='Connect with your friends, get to know new people, open new communities or join an existing one. Your journey begins here!'
              url_img={children} 
            />
          </Col>
          <Col md={12} lg={4}>
            <GalleryItem 
              header='Help' 
              paragraph='Ask for something you need or offer what you can give. Contribute to the causes you believe in.  Join others in making a difference!'
              url_img={children_holding_hands} 
            />
          </Col>
        </Row>
    </Container>
  );
};

export default Gallery;