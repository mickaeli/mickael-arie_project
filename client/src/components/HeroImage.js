import React from 'react';
import {Link} from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap'
import {Link as ScrollLink} from 'react-scroll'

import './HeroImage.css'

const HeroImage = ({
  header, 
  paragraph, 
  url_img,
  heroType,
  heroSize,
  hasSignupButton, 
  hasSigninButton
}) => {

  let background, signupButton,signinButton, paddingImg, paddingButton, arrowButton;

  paddingImg = (heroSize === 'large') ? '380px' : '300px'
  paddingButton = (hasSignupButton && hasSigninButton) ? '1rem 4.5rem' : '1rem 8rem'
  if(hasSignupButton){
    signupButton = (<Link to='/signup'><Button style={{padding: paddingButton }} className='button' variant='primary' size="lg">Sign up</Button></Link>)
  } else{
    signupButton = null
  }

  if(hasSigninButton){
    signinButton = (<Link to='/signin'><Button style={{padding: paddingButton }} className='button' variant="light" size="lg">Sign In</Button></Link>)
  } else{
    signinButton = null
  }

  if(heroType === 'withArrow'){
    arrowButton = (<ScrollLink
      className='link'
      to="down"
      spy={true}
      smooth={true}
      duration={500}
    >
      <div className='arrow'></div>
    </ScrollLink>)
  } else {
    arrowButton = null
  }

  switch (heroType) {
    case 'normal':
    case 'parallax':
      background = ('linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(' + url_img + ')')
      break;
    case 'bg_blue':
      background = ('linear-gradient(rgba(0, 125, 177, 0.67), rgba(0, 125, 177, 0.67)), url(' + url_img + ')')
      break;
    case 'bg_blue2':
      background = ('linear-gradient(rgba(0, 125, 159, 0.71), rgba(0, 125, 159, 0.71)), url(' + url_img + ')')
      break;
    case 'withArrow':
      background = ('linear-gradient(rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0.41)), url(' + url_img + ')')
      break;
    case 'desktop':
      background = ('linear-gradient(rgba(43, 38, 38, 0.55), rgba(43, 38, 38, 0.55)), url(' + url_img + ')')
      break;
    default:
      break;
  }

  return (
    <div className='hero-image' 
      style={
        { backgroundImage : background,
          backgroundAttachment : heroType==='parallax' ? 'fixed' : '',
          paddingTop : paddingImg,
          paddingBottom : paddingImg
        }}
    >
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className='hero-text'>
              {header}
              {paragraph}
              { signinButton }
              { signupButton }
            </div>
          </Col>
        </Row>  
      </Container>
      {arrowButton}
    </div>
  );
};

export default HeroImage;