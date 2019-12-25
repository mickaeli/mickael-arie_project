import React from 'react';
import './SigninSection.css'
import Container from 'react-bootstrap/Container'

const SigninSection = () => {
  return (
      <div className='signin-section'>
        <Container>
          <div className='container-wrapper'>
            <h1>Know what happens, when it happens, and make a difference!</h1>
            <p>Gooder™ will let you explore a world of social, community & good actions. 
              We believe that everything is possible once people are brought together for a good cause. Start your journey today!</p>
          </div>
        </Container>
      </div>
  );
};

export default SigninSection;