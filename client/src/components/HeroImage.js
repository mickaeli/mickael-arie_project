import React, { Fragment } from 'react';
import './HeroImage.css'
import { Container, Button } from 'react-bootstrap'

const HeroImage = ({header, paragraph, url_img, bg_blue, parallax}) => {
  return (
      <div className='hero-image' 
        style={
          { backgroundImage : bg_blue ? ('linear-gradient(rgba(0, 125, 177, 0.67), rgba(0, 125, 177, 0.67)), url(' + url_img + ')') : 
            ('linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(' + url_img + ')'),
            backgroundAttachment : parallax ? 'fixed' : ''
          }}
      >
        <Container>
          <div className='hero-text'>
            {/* <h1>Know what happens, when it happens, and make a difference!</h1> */}
            <h1>{header}</h1>
            <p>{paragraph}</p>
            <div>
              { !bg_blue ? <Button className='button' variant="light" href="#" size="lg">Sign In</Button> : <Fragment></Fragment>}
              <Button className='button' variant='primary' href="#" size="lg">Sign Up</Button>
            </div>
            {/* <p>Gooder™ will let you explore a world of social, community & good actions. 
              We believe that everything is possible once people are brought together for a good cause. Start your journey today!</p> */}
          </div>
        </Container>
      </div>
  );
};

export default HeroImage;