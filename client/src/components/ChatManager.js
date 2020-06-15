import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import './ChatManager.css'

import ActiveFriends from './ActiveFriends'
import ChatContainer from './Chat'

import { SocketContext } from '../Context'

import chatLogo from '../img/chat_logo.png'


class ChatManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
      friends: [],
      activeFriends: [],
      showActiveFriends: false
    }
  }

  componentDidMount() {
    axios.get(`/friends/connections/${this.state.username}`)
    .then(res => {
      if(res.data.success) {
        this.setState({
          friends: res.data.friendsList
        }, this.setSocketEvent)
      }
    })
    .catch(err => {
      console.log('get friends error: ', err);
    })
  }
  

  showActiveFriends = () => { this.setState({showActiveFriends: true}) }
  hideActiveFriends = () => { this.setState({showActiveFriends: false}) }

  setSocketEvent = () => {
    this.context.socket.emit('join', this.state.username);

    this.context.socket.on("activeUsers", users => {
      const activeFriends = users.filter(user => this.state.friends.indexOf(user) >= 0)
      this.setState({
        activeFriends
      })
    });


    this.context.socket.on('userConnected', user => {
      if(this.state.friends.indexOf(user) >= 0) {
        this.setState({
          activeFriends: [...this.state.activeFriends, user]
        })
      }
    })

    this.context.socket.on('newFriendConnected', ({sender, receiver}) => {
      if(sender === this.state.username) {
        this.setState({
          friends: [...this.state.friends, receiver],
          activeFriends: [...this.state.activeFriends, receiver]
          }, () => {
            this.context.socket.emit('resToNewFriend', { sender, receiver } )
        })
      }
    })

    this.context.socket.on('resToNewFriend', ({sender, receiver}) => {
      if(receiver === this.state.username) {
        this.setState({
          friends: [...this.state.friends, sender],
          activeFriends: [...this.state.activeFriends, sender]
          })
      }
    })

    this.context.socket.on('userDisconnected', user => {
      this.setState({
        activeFriends: this.state.activeFriends.filter(friend => {
          return friend !== user
        })
      })
    })
  }


  render() {
    return (
      <Fragment>
        {
          !(this.state.showActiveFriends) &&
          (<button className='chat-manager-button' onClick={this.showActiveFriends}>
            <div>
              <img className='chat-logo' src={chatLogo} alt="chat logo"/>
            </div>
          </button>)
        }
        {
          this.state.showActiveFriends &&
          <div className='chat-area'>
            <ActiveFriends activeFriends={this.state.activeFriends} hideActiveFriends={this.hideActiveFriends} />
            <ChatContainer />
          </div>
        }
      </Fragment>
    );
  }
}

ChatManager.contextType = SocketContext;

export default withRouter(ChatManager);