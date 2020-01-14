import React from 'react';
import './HeroImage.css'
import { Container, Button } from 'react-bootstrap'

const HeroImage = ({header, paragraph, url_img, bg_blue, parallax}) => {

  let background, signinButton = null
   if(bg_blue)
   {
     background = ('linear-gradient(rgba(0, 125, 177, 0.67), rgba(0, 125, 177, 0.67)), url(' + url_img + ')') 

   } else{
      background = ('linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(' + url_img + ')')
      signinButton = (<Button style={{padding: '1rem 4.5rem' }} className='button' variant="light" href="#" size="lg">Sign In</Button>)
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
            {/* <h1>Know what happens, when it happens, and make a difference!</h1> */}
            <h1>{header}</h1>
            <p>{paragraph}</p>
            <div>
              { signinButton }
              <Button 
                style={ {padding : bg_blue ? ('1rem 8rem') : ('1rem 4.5rem')} } 
                className='button' 
                variant='primary' 
                href="#" 
                size="lg">Sign Up
              </Button>
            </div>
            {/* <p>Gooder™ will let you explore a world of social, community & good actions. 
              We believe that everything is possible once people are brought together for a good cause. Start your journey today!</p> */}
          </div>
        </Container>
      </div>
  );
};

export default HeroImage;