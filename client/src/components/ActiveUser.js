import React, {Component} from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios'

import Avatar from './Avatar'

import { createRoomName } from '../utils'

import './ActiveUser.css'

class ActiveUser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userDetails: {
        fullname: '',
        profilePicture: ''
      },
      chatOpen: false
    }
  }

  componentDidMount() {
    
    axios.get(`/profile_details/${this.props.friend}`) //get props.user
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          userDetails: Object.assign({}, res.data.userDetails )
        })
      }
    })
    .catch(err => {
      console.log('get profile_details error: ', err);
    })

    this.setState({
      chatOpen: this.props.rooms.some(room => {
        return room.replace(this.props.username, '') === this.props.friend
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(prevProps.rooms !== this.props.rooms) {
      this.setState({
        chatOpen: this.props.rooms.some(room => {
          return room.replace(this.props.username, '') === this.props.friend
        })
      })
    }
  }

  openChat = () => {

    this.props.openChat(this.props.friend);
  }

  closeChat = () => {

    const roomName = createRoomName(this.props.username, this.props.friend)

    this.props.closeChat(roomName);
  }

  render() {

    const default_profile_picture = 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png'

    let button;

    if(!this.state.chatOpen) {
      button = (<Button className='button' onClick={this.openChat} > chat </Button>)

    } else {
      button = (<Button className='button' onClick={this.closeChat} > close </Button>)
    }

    return (
      <div className='active-user'>
        <div className='user-profile-image'>
          <Avatar 
          profile_picture={ this.state.userDetails.profilePicture } 
          center_image={ this.state.userDetails.profilePicture === default_profile_picture ? true : false } 
          size='xs'
          is_button={false}
          />
        </div>
        <p className='user-fullname'> { this.state.userDetails.fullname } </p>
        {button}
      </div>
      
    );
  }
}

export default ActiveUser;