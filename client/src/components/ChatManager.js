import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import './ChatManager.css'

import ActiveFriends from './ActiveFriends'
import Chat from './Chat'

import { SocketContext } from '../Context'
import { createRoomName } from '../utils'
 
import chatLogo from '../img/chat_logo.png'


class ChatManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
      friends: [],
      activeFriends: [],
      showActiveFriends: false,
      rooms: []
    }

    this.chatWindowsRef = React.createRef()
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

  componentDidUpdate(prevProps, prevState) {
    if(prevState.rooms !== this.state.rooms) {
      this.scrollToBottom()
    }
  }
  

  setSocketEvent = () => {
    this.context.socket.emit('join', this.state.username);

    this.context.socket.on("activeUsers", users => {

      //looking for active users who are my friends
      const activeFriends = users.filter(user => this.state.friends.indexOf(user) >= 0)
      this.setState({
        activeFriends
      })
    });


    this.context.socket.on('userConnected', user => {

      //if user is my friend add it to active friends variable
      if(this.state.friends.indexOf(user) >= 0) {
        this.setState({
          activeFriends: [...this.state.activeFriends, user]
        })
      }
    })

    this.context.socket.on('newFriendConnected', ({sender, receiver}) => {
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
        }),
        rooms: this.state.rooms.filter(room => {
          return room.indexOf(user) === -1
        })
      })
    })

    this.context.socket.on('joinToRoom', ({friendName, roomName}) => {

      if(friendName === this.state.username && this.state.rooms.indexOf(roomName) === -1) {
          this.context.socket.emit('joinToRoom', {
            roomName,
            sendEventToFriend: false
          });

          this.setState({
            rooms: [...this.state.rooms, roomName]
          })
        
      }
      
    })

    //this.context.socket.on('leaveRoom', roomName => {

      //this.context.socket.emit('leaveRoom', {roomName, sendEventToFriend: false})

      //this.setState({
      //  rooms: this.state.rooms.filter(room => {
      //    return room !== roomName
      //  })
      //})
    //})
  }

  openChat = friendName => {

    const roomName = createRoomName(this.state.username, friendName)

    this.context.socket.emit('joinToRoom', {
      friendName, 
      roomName,
      sendEventToFriend: true
    });

    this.setState({
      rooms: [...this.state.rooms, roomName]
    })
  }

  closeChat = roomName => {

    this.context.socket.emit('leaveRoom', {roomName, sendEventToFriend: true})

    this.setState({
      rooms: this.state.rooms.filter(room => {
        return room !== roomName
      })
    })
  }

  showActiveFriends = () => { this.setState({showActiveFriends: true}) }
  hideActiveFriends = () => { this.setState({showActiveFriends: false}) }

  scrollToBottom = () => {
    window.scrollTo(0, this.chatWindowsRef.current.offsetTop)
    //this.chatWindowsRef.current.scrollIntoView({ behavior: "smooth" });
  }


  render() {
    return (
      <Fragment>
        {
          !(this.state.showActiveFriends) &&
          (<button className='chat-manager-button position-fixed' onClick={this.showActiveFriends}>
            <div>
              <img className='chat-logo' src={chatLogo} alt="chat logo"/>
            </div>
          </button>)
        }
        {
          this.state.showActiveFriends &&
            <div className='position-fixed'>
              <ActiveFriends activeFriends={this.state.activeFriends} hideActiveFriends={this.hideActiveFriends} username={this.state.username} rooms={this.state.rooms} openChat={this.openChat} closeChat={this.closeChat} />
            </div>
        }
        <div className='chat-windows' ref={this.chatWindowsRef}>
          {
            this.state.rooms.map(room => (<div key={room} ><Chat username={this.state.username} header={'Chat - ' + room.replace(this.state.username, '') } room={room} closeChat={this.closeChat} /> </div>))
          }
        </div>
      </Fragment>
    );
  }
}

ChatManager.contextType = SocketContext;

export default withRouter(ChatManager);