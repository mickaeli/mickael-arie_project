import React from 'react';

import './ChatInput.css';

const ChatInput = ({message, setMessage, sendMessage}) => (
  <form className="form">
    <input
      className="chat-input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}> Send </button>
  </form>
)

export default ChatInput;