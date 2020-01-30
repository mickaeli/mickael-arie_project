import React from 'react';
import './HeroImage.css'
import { Container, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';

const HeroImage = ({header, paragraph, url_img, bg_blue, parallax}) => {

  let background, signinButton;
   if(bg_blue)
   {
     background = ('linear-gradient(rgba(0, 125, 177, 0.67), rgba(0, 125, 177, 0.67)), url(' + url_img + ')')
     signinButton = null

   } else{
      background = ('linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(' + url_img + ')')
      signinButton = (<Link to='/signin'><Button style={{padding: '1rem 4.5rem' }} className='button' variant="light" size="lg">Sign In</Button></Link>)
   }

  return (
      <div className='hero-image' 
        style={
          { backgroundImage : background,
            backgroundAttachment : parallax ? 'fixed' : ''
          }}
      >
        <Container>
          <div className='hero-text'>
            <h1>{header}</h1>
            <p>{paragraph}</p>
            <div>
              { signinButton }
              <Link to='/signup'>
                <Button 
                  style={ {padding : bg_blue ? ('1rem 8rem') : ('1rem 4.5rem')} } 
                  className='button' 
                  variant='primary'
                  size="lg">Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
  );
};

export default HeroImage;