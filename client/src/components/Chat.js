import React, { Component } from 'react';

import InfoBar from './InfoBar'
import Messages from './Messages'
import ChatInput from './ChatInput'

import { AccountContext } from '../Context'

import './Chat.css'

class Chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
      show: true,
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
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

  componentWillUnmount() {
    this.context.socket.off('message');
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
        <InfoBar header={'Chat - ' + this.props.room.replace(this.state.userDetails.username, '') } room={this.props.room} closeFunction={this.props.closeChat} isplusIcon={true}  minimizeMaximize={this.showHide} />
        <div className='chat' style={{display: this.state.show ? '' : 'none'}}>
          <Messages messages={this.state.messages} />
          <ChatInput message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }

};

Chat.contextType = AccountContext;

export default Chat;