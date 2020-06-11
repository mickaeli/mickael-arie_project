import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'

import ActiveFriends from './ActiveFriends'

import './ChatManager.css'

import chatLogo from '../img/chat_logo.png'

const ENDPOINT = 'http://localhost:5000';

class ChatManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      socket: io(ENDPOINT),
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

    window.addEventListener('friendsConnection', this.handleFriendConnection)
  }
  

  componentWillUnmount() {
    this.state.socket.close()
    window.removeEventListener('friendsConnection', this.handleFriendConnection)
  }
  

  showActiveFriends = () => { this.setState({showActiveFriends: true}) }
  hideActiveFriends = () => { this.setState({showActiveFriends: false}) }

  setSocketEvent = () => {
    this.state.socket.emit('join', this.state.username);

    this.state.socket.on("activeUsers", users => {
      const activeFriends = users.filter(user => this.state.friends.indexOf(user) >= 0)
      this.setState({
        activeFriends
      })
    });


    this.state.socket.on('userConnected', user => {
      if(this.state.friends.indexOf(user) >= 0) {
        this.setState({
          activeFriends: [...this.state.activeFriends, user]
        })
      }
    })

    this.state.socket.on('userDisconnected', user => {
      this.setState({
        activeFriends: this.state.activeFriends.filter(friend => {
          return friend !== user
        })
      })
    })
  }

  handleFriendConnection = (event) => {
    if(event.detail.sender === this.state.username) {
      this.setState({
        friends: [...this.state.friends, event.detail.receiver]
      })
    }
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
          <ActiveFriends activeFriends={this.state.activeFriends} hideActiveFriends={this.hideActiveFriends} />
        }
      </Fragment>
    );
  }
}

export default withRouter(ChatManager);