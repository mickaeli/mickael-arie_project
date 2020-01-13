import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import './App.css';
// import Membre from './components/Membre';
import DescSection from './components/DescSection';
import HeroImage from './components/HeroImage';
import DescSection2 from './components/DescSection2';
import SlideShow from './components/SlideShow';
import beach from './img/beach.jpg';
import hands from './img/hands.jpg';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Header from './components/Header';

const App = props => {
  useEffect(() => {
    axios.get('/api/hello')
      .then(res => setState(res.data))
  }, [])

  const [state, setState] = useState('')
  const header = 'Know what happens, when it happens, and make a difference!'
  const paragraph = 'Gooder™ will let you explore a world of social, community & good actions.' +
  'We believe that everything is possible once people are brought together for a good cause. Start your journey today!'

  return (
    <div>
      <Header />
      <HeroImage header='Gooder' paragraph='Socialize your good-doing' url_img={hands} blue={false} parallax={true}/>
      <DescSection />
      <HeroImage header={header} paragraph={paragraph} url_img={beach} bg_blue={false} parallax={false}/>
      <DescSection2 />
      <SlideShow />
      <Gallery />
      <Footer />
      <p>{state}</p>
    </div>
)
};

export default App;

/* <h1>Gooder app</h1>
      <Membre name='Mickael'/>
      <Membre name='Meir'>
        <strong>je suis le 5e enfant</strong>
      </Membre> */