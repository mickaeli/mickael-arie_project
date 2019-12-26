import React from 'react';
// import './App.css';
// import Membre from './components/Membre';
import DescSection from './components/DescSection';
import GradientSection from './components/GradientSection';
import DescSection2 from './components/DescSection2';
import SlideShow from './components/SlideShow';
import beach from './img/beach.jpg';


function App() {
  const header = 'Know what happens, when it happens, and make a difference!'
  const paragraph = 'Gooder™ will let you explore a world of social, community & good actions.' +
  'We believe that everything is possible once people are brought together for a good cause. Start your journey today!'
  return (
    <div>
      <DescSection />
      <GradientSection header={header} paragraph={paragraph} url_img={beach} />
      <DescSection2 />
      <SlideShow />
    </div>
  );
}

export default App;

/* <h1>Gooder app</h1>
      <Membre name='Mickael'/>
      <Membre name='Meir'>
        <strong>je suis le 5e enfant</strong>
      </Membre> */