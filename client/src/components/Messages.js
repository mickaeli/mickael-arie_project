import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message'

import './Messages.css'

const Messages = ({ messages }) => {

  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message}/></div>)}
    </ScrollToBottom>
  );
};

export default Messages;