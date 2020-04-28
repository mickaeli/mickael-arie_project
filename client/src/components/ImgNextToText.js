import React from 'react';
import './ImgNextToText.css';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const ImgNextToText = ({url_img, header, paragraphs,imgSize, hasButton}) => {
  let button, height;
  button = hasButton ? (<Link to='/about' ><Button className='button' variant="outline-dark" size="lg">Learn more</Button></Link>) : ''
  height = (imgSize === 'large') ? '50rem' : '25rem'
  const list = Object.keys(paragraphs)
              .map(par => (<p key={par}>{paragraphs[par]}</p>))

  return (
    <Container fluid className='img-next-to-text'>
      <Row>
        <Col sm={12} lg={6} xl={{ span: 4, offset: 2 }} className='col'>
          <Image src={url_img} alt={url_img} style={{ minHeight: height}}/>
        </Col>
        <Col sm={12} lg={6} xl={4}>
          <div className='container-wrapper'>
            <h1>{header}</h1>
            {list}
            {button}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ImgNextToText;