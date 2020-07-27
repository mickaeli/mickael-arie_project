import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import './DescSection.css';

const DescSection = () => {
  return (
    <Container fluid className= 'desc-section'>
      <Row>
        <Col md={12} lg={{ span: 8, offset: 2 }}>
          <p>Gooder&trade; is a new way of good-doing. Expand your community help while connecting & 
            socializing with people from all over the world. Whether you need something or have something to offer - 
            Gooder&trade; will open a new world of opportunities. Make your life better or change someone's life within a second - 
            It's all up to you.</p>
        </Col>
      </Row>
    </Container>  
  );
};

export default DescSection;