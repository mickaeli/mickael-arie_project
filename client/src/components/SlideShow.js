import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import worker from '../img/worker.jpg';
import HeroImage from './HeroImage';

const SlideShow = () => {
  const header = 'Become a Gooder'
  const paragraph = 'Nothing equals to the feeling of doing something good, the right way. ' +
  'Become a Gooder and discover endless opportunities to contribute and make the world a better place'

  return (
    <Carousel >
      <Carousel.Item>
        <HeroImage header={(<h1>{header}</h1>)} paragraph={<p>{paragraph}</p>} url_img={worker} heroType='bg_blue' heroSize='small' hasSignupButton />
      </Carousel.Item>
      <Carousel.Item>
        <HeroImage header={(<h1>{header}</h1>)} paragraph={<p>{paragraph}</p>} url_img={worker} heroType='bg_blue' heroSize='small' hasSignupButton />
      </Carousel.Item>
      <Carousel.Item>
        <HeroImage header={(<h1>{header}</h1>)} paragraph={<p>{paragraph}</p>} url_img={worker} heroType='bg_blue' heroSize='small' hasSignupButton />
      </Carousel.Item>
    </Carousel>
    );
  };

export default SlideShow;