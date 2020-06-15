import React from 'react';

import './ChatInput.css';

const ChatInput = (props) => (
  <form className="form">
    <input
      className="chat-input"
      type="text"
      placeholder="Type a message..."
      // value={message}
      // onChange={({ target: { value } }) => setMessage(value)}
      // onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton">Send</button>
  </form>
)

export default ChatInput;