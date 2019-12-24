import React from 'react';
import './DescSection2.css';
import under_gallerie from '../img/underground_gallery.jpg';

const DescSection2 = () => {
  return (
      <div className='desc-section2'>
        <img src={under_gallerie} alt="underground gallery"/>
        <div className='container'>
          <h1>So.. who we are and what are we all about?</h1>
          <p>Gooder™ is a social network for good-doing & good causes. 
            Whether you need help, have something to offer or run a charity organization - 
            Gooder™ is the place for you. After logging in, you'll be able to build a personal 
            or organizational profile page, connect with others, socialize and make good. 
            Gooder™ is the best place for anyone interested in asking for or doing good actions, 
            gathering around good causes, getting to know people & help. </p>
            <p>Gooder™ were made as a final project at Hadassah Academic College, Computer Science department.</p>
          </div>
      </div>
  );
};

export default DescSection2;