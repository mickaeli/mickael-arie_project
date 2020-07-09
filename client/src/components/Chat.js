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
      messages: [],
      show: true
    }
  }

  componentDidMount() {
    
    this.context.socket.on("message", ({message, room}) => {
      if(room === this.props.room) {
        this.setState({
          messages: [...this.state.messages, message]
        })
      }
    });
  }

  setMessage = newMsg => {
    this.setState({
      message: newMsg
    })
  }

  sendMessage = event => {
    event.preventDefault();

    if(this.state.message) {
      this.context.socket.emit('sendMessage', { message: this.state.message, room: this.props.room }, () => this.setMessage(''));
    }
  }

  showHide = () => {
    this.setState({show: !this.state.show})
  }
  

  render() {
    return (
      <div>
        <InfoBar header={this.props.header} room={this.props.room} closeFunction={this.props.closeChat} isplusIcon={true}  minimizeMaximize={this.showHide} />
        <div className='chat' style={{display: this.state.show ? '' : 'none'}}>
          <Messages messages={this.state.messages} name={this.props.username} />
          <ChatInput message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }

};

Chat.contextType = SocketContext;

export default Chat;