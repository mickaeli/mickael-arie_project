import React from 'react';
import './GradientSection.css'
import Container from 'react-bootstrap/Container'

const GradientSection = ({header, paragraph, url_img}) => {
  return (
      <div className='gradient-section' style={{backgroundImage : 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(' + url_img + ')'}}>
        <Container>
          <div className='container-wrapper'>
            {/* <h1>Know what happens, when it happens, and make a difference!</h1> */}
            <h1>{header}</h1>
            <p>{paragraph}</p>
            {/* <p>Gooder™ will let you explore a world of social, community & good actions. 
              We believe that everything is possible once people are brought together for a good cause. Start your journey today!</p> */}
          </div>
        </Container>
      </div>
  );
};

export default GradientSection;