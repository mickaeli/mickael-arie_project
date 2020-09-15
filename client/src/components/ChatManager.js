import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'



import ActiveFriends from './ActiveFriends'
import Chat from './Chat'

import { createRoomName } from '../utils'
 
import chatLogo from '../img/chat_logo.png'

import './ChatManager.css'

class ChatManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeFriends: [],
      showActiveFriends: false,
      rooms: [],
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
    }
  }

  componentDidMount() {

    //run function setSocketEvents after one second for waiting this.props.context.friends is ready in DashBoardContainer component
    this.timeout = setTimeout(this.setSocketEvents, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    this.closeSocketEvents()
  }
  

  setSocketEvents = () => {

    this.props.context.socket.emit('join', this.state.userDetails.username);

    this.props.context.socket.on("activeUsers", users => {

        //looking for active users who are my friends
          this.setState({
            activeFriends: users.filter(user => this.props.context.friends.indexOf(user) >= 0)
          })
        
      
    });


    this.props.context.socket.on('userConnected', user => {

      //if user is my friend add it to active friends variable
      if(this.props.context.friends.indexOf(user) >= 0) {
        this.setState({
          activeFriends: [...this.state.activeFriends, user]
        })
      }
    })

    this.props.context.socket.on('newFriendConnected', ({sender, receiver}) => {

      if(receiver === this.state.userDetails.username) {

        this.setState({
          activeFriends: [...this.state.activeFriends, sender]
        })
      }
    })

    this.props.context.socket.on('deleteFriend', ({sender, receiver, closeChat}) => {

      if(receiver === this.state.userDetails.username) {

          this.setState({
            activeFriends: this.state.activeFriends.filter(user => {
              return user !== sender
            })
          })
        

        if(closeChat){
          this.closeChat(createRoomName(this.state.userDetails.username, sender))
        }
        
      }
    })

    this.props.context.socket.on('userDisconnected', user => {
        this.setState({
          activeFriends: this.state.activeFriends.filter(friend => {
            return friend !== user
          }),
          rooms: this.state.rooms.filter(room => {
            return room.indexOf(user) === -1
          })
        })
      
    })

    this.props.context.socket.on('joinToRoom', ({friendName, roomName}) => {

      if(friendName === this.state.userDetails.username && this.state.rooms.indexOf(roomName) === -1) {
          this.props.context.socket.emit('joinToRoom', {
            roomName,
            sendEventToFriend: false
          });

            this.setState({
              rooms: [...this.state.rooms, roomName]
            })
        
      }
      
    })
  }

  closeSocketEvents = () => {
    this.context.socket.off('activeUsers');
    this.context.socket.off('userConnected');
    this.context.socket.off('newFriendConnected');
    this.context.socket.off('deleteFriend');
    this.context.socket.off('userDisconnected');
    this.context.socket.off('joinToRoom');
  }

  openChat = friendName => {

    const roomName = createRoomName(this.state.userDetails.username, friendName)

    this.props.context.socket.emit('joinToRoom', {
      friendName, 
      roomName,
      sendEventToFriend: true
    });

      this.setState({
        rooms: [...this.state.rooms, roomName]
      })
    
  }

  closeChat = roomName => {

    this.props.context.socket.emit('leaveRoom', {roomName, sendEventToFriend: true})

      this.setState({
        rooms: this.state.rooms.filter(room => {
          return room !== roomName
        })
      })
    
  }

  showActiveFriends = () => this.setState({showActiveFriends: true})
  hideActiveFriends = () => this.setState({showActiveFriends: false})

  render() {

    return (
      <Fragment>
      <Container fluid>
        <Row>
          <Col xl={9} lg={8} md={7} xs={6}>
            <div className='chat-windows chat-windows-fixed'>
              {
                this.state.rooms.map(room => (<div key={room} ><Chat room={room} closeChat={this.closeChat} /> </div>))
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
                  <ActiveFriends activeFriends={this.state.activeFriends} hideActiveFriends={this.hideActiveFriends} rooms={this.state.rooms} openChat={this.openChat} closeChat={this.closeChat} />
                </div>
            }
          </Col>
        </Row>
      </Container>
      </Fragment>
    );
  }
}


export default withRouter(ChatManager);