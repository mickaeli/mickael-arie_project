import React, { useContext } from 'react';
import ReactEmoji from 'react-emoji';

import { AccountContext } from '../Context'

import './Message.css';

const Message = ({ message: { text, user } }) => {

  const accountContext = useContext(AccountContext)

  let isSentByCurrentUser = false;

  if(user === accountContext.username) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
    ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{user}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
      )
    : (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        </div>
        <p className="sentText pl-10 ">{user}</p>
      </div>
    )
  );
};

export default Message;