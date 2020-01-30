import React, { Component } from 'react';

import DescSection from './DescSection';
import HeroImage from './HeroImage';
import DescSection2 from './DescSection2';
import SlideShow from './SlideShow';
import beach from '../img/beach.jpg';
import hands from '../img/hands.jpg';
import Gallery from './Gallery';

class Home extends Component {

  componentDidMount() {
    document.title = 'Gooder - Socialize your good-doing'
  }



  render() {
    const header = 'Know what happens, when it happens, and make a difference!'
    const paragraph = 'Gooder™ will let you explore a world of social, community & good actions.' +
    'We believe that everything is possible once people are brought together for a good cause. Start your journey today!'
    return (
      <div className='home'>
        <HeroImage header='Gooder' paragraph='Socialize your good-doing' url_img={hands} blue={false} parallax={true}/>
        <DescSection />
        <HeroImage header={header} paragraph={paragraph} url_img={beach} bg_blue={false} parallax={false}/>
        <DescSection2 />
        <SlideShow />
        <Gallery />  
      </div>
    );
  }
}

export default Home;