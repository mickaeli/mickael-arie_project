import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './SlideShow.css';
import worker from '../img/worker.jpg';
import GradientSection from './GradientSection';

const SlideShow = () => {
  const header = 'Become a Gooder'
  const paragraph = 'Nothing equals to the feeling of doing something good, the right way. ' +
  'Become a Gooder and discover endless opportunities to contribute and make the world a better place'

  return (
    <Carousel>
      <Carousel.Item>
        <GradientSection header={header} paragraph={paragraph} url_img={worker}/>
      </Carousel.Item>
      <Carousel.Item>
        <GradientSection header={header} paragraph={paragraph} url_img={worker}/>
      </Carousel.Item>
      <Carousel.Item>
        <GradientSection header={header} paragraph={paragraph} url_img={worker}/>
      </Carousel.Item>
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
    );
  };
    // <div>
    //     <img src={worker} alt="worker"/>
    //     <img src={under_gallerie} alt="underground gallery"/> 
    // </div>

export default SlideShow;