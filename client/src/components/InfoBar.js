import React from 'react';

import './InfoBar.css'

import closeIcon from '../img/closeIcon.png';

const ChatInfoBar = ({header, closeFunction}) => {
  return (
    <div className='info-bar'>
      <h1>{header}</h1>
      <button className='close-icon' onClick={closeFunction}>
        <img src={closeIcon} alt="close icon"/>
      </button>
    </div>
  );
};

export default ChatInfoBar;