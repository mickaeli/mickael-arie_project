import React, { Component } from 'react';

import DescSection from './DescSection';
import HeroImage from './HeroImage';
import ImgNextToText from './ImgNextToText';
import SlideShow from './SlideShow';
import beach from '../img/beach.jpg';
import hands from '../img/hands.jpg';
import underground_gallery from '../img/underground_gallery.jpg';
import Gallery from './Gallery';

class Home extends Component {

  componentDidMount() {
    document.title = 'Gooder - Socialize your good-doing'
  }



  render() {
    const header1 = 'Know what happens, when it happens, and make a difference!'
    const paragraph = 'Gooder™ will let you explore a world of social, community & good actions.' +
    'We believe that everything is possible once people are brought together for a good cause. Start your journey today!'
    const header2 = 'So.. who we are and what are we all about?'
    const paragraphs = [ 'Gooder\u2122 is a social network for good-doing & good causes.' +
                  'Whether you need help, have something to offer or run a charity organization -' + 
                  'Gooder\u2122 is the place for you. After logging in, you\'ll be able to build a personal' + 
                  'or organizational profile page, connect with others, socialize and make good.' + 
                  'Gooder\u2122 is the best place for anyone interested in asking for or doing good actions,' + 
                  'gathering around good causes, getting to know people & help.',
                  'Gooder\u2122 were made as a final project at Hadassah Academic College, Computer Science department.' ]
    return (
      <div className='home'>
        <HeroImage header= {<h1>Gooder</h1>} paragraph={<p>Socialize your good-doing</p>} url_img={hands} heroType='parallax' heroSize='small' hasSignupButton hasSigninButton />
        <DescSection />
        <HeroImage header={(<h1>{header1}</h1>)} paragraph={<p>{paragraph}</p>} url_img={beach} heroType='normal' heroSize='large' hasSignupButton hasSigninButton/>
        <ImgNextToText url_img={underground_gallery} header={header2} paragraphs={paragraphs} imgSize='small' hasButton />
        <SlideShow />
        <Gallery />  
      </div>
    );
  }
}

export default Home;