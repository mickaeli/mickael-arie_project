import React, { Component } from 'react';

import './Chat.css'

import { SocketContext } from '../Context'

import InfoBar from './InfoBar'
import Messages from './Messages'
import ChatInput from './ChatInput'

class Chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: []
    }
  }

  componentDidMount() {
    
    this.context.socket.on("message", message => {
      this.setState({
        messages: [...this.state.messages, message]
      })
    });
  }
  

  render() {
    return (
      <div className='chat'>
        <InfoBar header={this.props.header} room={this.props.room} closeFunction={this.props.closeChat} />
        <Messages messages={this.state.messages} name={this.props.username} />
        <ChatInput message={this.state.message} />
      </div>
    );
  }

};

Chat.contextType = SocketContext;

export default Chat;