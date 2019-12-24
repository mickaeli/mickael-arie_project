import React from 'react';
// import './App.css';
// import Membre from './components/Membre';
import DescSection from './components/DescSection';
import SigninSection from './components/SigninSection';
import DescSection2 from './components/DescSection2';


function App() {
  return (
    <div>
      <DescSection />
      <SigninSection />
      <DescSection2 />
    </div>
  );
}

export default App;

/* <h1>Gooder app</h1>
      <Membre name='Mickael'/>
      <Membre name='Meir'>
        <strong>je suis le 5e enfant</strong>
      </Membre> */