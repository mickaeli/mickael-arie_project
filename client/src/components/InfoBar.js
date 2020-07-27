import React, { useState } from 'react';



import closeIcon from '../img/closeIcon.png';
import plusIcon from '../img/plusIcon.png';
import minusIcon from '../img/minusIcon.png';

import './InfoBar.css'

const InfoBar = ({header, room, closeFunction, isplusIcon, minimizeMaximize}) => {

  const [icon, setIcon] = useState({src: minusIcon, alt: 'minusIcon'})

  const minMax = () => {
    if(icon.src === plusIcon) {
      setIcon({src: minusIcon, alt: 'minusIcon'})
    } else {
      setIcon({src: plusIcon, alt: 'plusIcon'})
    }
    minimizeMaximize()
  }

  return (
    <div className='info-bar'>
      <h1>{header}</h1>
      {
        isplusIcon &&
        (<button className='icon-menu' data-toggle='collapse' data-target='#chat-body' aria-expanded="true" aria-controls="chat-body" onClick={minMax}>
          <img  src={icon.src} alt={icon.alt}/>
        </button>)
      }
      
      <button className='icon-menu' onClick={ () => { closeFunction(room) }}>
        <img src={closeIcon} alt="close icon"/>
      </button>
    </div>
  );
};

export default InfoBar;