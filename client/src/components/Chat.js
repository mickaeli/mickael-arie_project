import React from 'react';

import './Chat.css'

import InfoBar from './InfoBar'
import Messages from './Messages'
import ChatInput from './ChatInput'

const Chat = () => {

  const messages = [
    {
      text: 'allo allo allo',
      user: 'mickael'
    },
    {
      text: 'yes',
      user: 'arie'
    },
    {
      text: 'allo',
      user: 'mickael'
    },
    {
      text: 'yes',
      user: 'arie'
    },
    {
      text: 'allo',
      user: 'mickael'
    },
    {
      text: ':-)',
      user: 'arie'
    }
  ]


  return (
    <div className='chat'>
      <InfoBar header={'Chat'} />
      <Messages messages={messages} name={'mickael'} />
      <ChatInput />
    </div>
  );
};

export default Chat;