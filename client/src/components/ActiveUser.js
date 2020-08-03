import React, {Component} from 'react';
import { Button } from 'react-bootstrap'
import UserDetails from './UserDetails';

import { AccountContext } from '../Context'
import { createRoomName } from '../utils'

import './ActiveUser.css'

class ActiveUser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      chatOpen: false,
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
    }
  }

  componentDidMount() {

    this.setState({
      chatOpen: this.props.rooms.some(room => {
        return room.replace(this.state.userDetails.username, '') === this.props.friend
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(prevProps.rooms !== this.props.rooms) {
      this.setState({
        chatOpen: this.props.rooms.some(room => {
          return room.replace(this.state.userDetails.username, '') === this.props.friend
        })
      })
    }
  }

  openChat = () => {

    this.props.openChat(this.props.friend);
  }

  closeChat = () => {

    const roomName = createRoomName(this.state.userDetails.username, this.props.friend)

    this.props.closeChat(roomName);
  }

  render() {

    let button;

    if(!this.state.chatOpen) {
      button = (<Button className='button' onClick={this.openChat} > chat </Button>)

    } else {
      button = (<Button className='button' onClick={this.closeChat} > close </Button>)
    }

    return (
      <div className='active-user'>
        <UserDetails username={this.props.friend} fullnameTag='p' picture={true} pictureSize='xs' description={false} callToServer={true} />
        {button}
      </div>
      
    );
  }
}

ActiveUser.contextType = AccountContext;

export default ActiveUser;