import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import './ChatManager.css'

import ActiveFriends from './ActiveFriends'
import Chat from './Chat'

import { AccountContext } from '../Context'
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

  render() {
    return (
      <Fragment>
      <Container fluid>
        <Row>
          <Col xl={9} lg={8} md={7} xs={6}>
            <div className='chat-windows chat-windows-fixed'>
              {
                this.state.rooms.map(room => (<div key={room} ><Chat username={this.state.username} header={'Chat - ' + room.replace(this.state.username, '') } room={room} closeChat={this.closeChat} /> </div>))
              }
            </div>
          </Col>
          <Col xl={3} lg={4} md={5} xs={6}>
            {
              !(this.state.showActiveFriends) &&
              (<button className='chat-manager-button active-friends-fixed' onClick={this.showActiveFriends}>
                <div>
                  <img className='chat-logo' src={chatLogo} alt="chat logo"/>
                </div>
              </button>)
            }
            {
              this.state.showActiveFriends &&
                <div className='active-friends-fixed'>
                  <ActiveFriends activeFriends={this.state.activeFriends} hideActiveFriends={this.hideActiveFriends} username={this.state.username} rooms={this.state.rooms} openChat={this.openChat} closeChat={this.closeChat} />
                </div>
            }
          </Col>
        </Row>
      </Container>
      </Fragment>
    );
  }
}

ChatManager.contextType = AccountContext;

export default withRouter(ChatManager);