import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import worker from '../img/worker.jpg';
import feet from '../img/feet.jpg';
import field from '../img/field.jpg';
import HeroImage from './HeroImage';

const SlideShow = () => {
  const headers = {
    header1: 'Become a Gooder',
    header2: 'Start your Journey',
    header3: 'Expand your Views'
  }

  const paragraphs = {
    paragraph1: 'Nothing equals to the feeling of doing something good, the right way. ' +
                'Become a Gooder and discover endless opportunities to contribute and make the world a better place',
    paragraph2: 'Life meant to be lived together. Touch someone\'s life, Make a difference, share your thougths and don\'t forget to enjoy. A brand new road is waiting',
    paragraph3: 'Your window to life can get so much larger when you break the box\'s bounderies. There\'s so much more waiting to be discovered, waiting to be lived'
  } 

  return (
    <Carousel >
      <Carousel.Item>
        <HeroImage header={(<h1>{headers.header1}</h1>)} paragraph={<p>{paragraphs.paragraph1}</p>} url_img={worker} heroType='bg_blue' heroSize='small' hasSignupButton />
      </Carousel.Item>
      <Carousel.Item>
        <HeroImage header={(<h1>{headers.header2}</h1>)} paragraph={<p>{paragraphs.paragraph2}</p>} url_img={feet} heroType='bg_blue' heroSize='small' hasSignupButton />
      </Carousel.Item>
      <Carousel.Item>
        <HeroImage header={(<h1>{headers.header3}</h1>)} paragraph={<p>{paragraphs.paragraph3}</p>} url_img={field} heroType='bg_blue' heroSize='small' hasSignupButton />
      </Carousel.Item>
    </Carousel>
    );
  };

export default SlideShow;