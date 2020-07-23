import React, {Component} from 'react';

import axios from 'axios'

import Avatar from './Avatar'
import FriendsButton from './FriendsButton'

import './User.css'



class User extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userDetails: {
        fullname: '',
        profilePicture: '',
        description: ''
      }
    }
  }

  componentDidMount() {
    
    axios.get(`/profile_details/${this.props.otherUser}`)
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
  }


  render() {

    const default_profile_picture = 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png'

    let content

    switch (this.props.userType) {
      case 'senderRequest':
        content = (<FriendsButton userType={this.props.userType} acceptRequest={this.props.acceptRequest} rejectRequest={this.props.rejectRequest} otherUser={this.props.otherUser} />)
        break;
      case 'receiverRequest':
      case 'friend':
        content = (<FriendsButton userType={this.props.userType} />)
        break;
      case 'otherUser':
        content = (<FriendsButton userType={this.props.userType} sendRequest={this.props.sendRequest} otherUser={this.props.otherUser} />)
        break;
      default:
        break;
    }

    return (
      <div className='user'>
        <div className='user-profile-image'>
          <Avatar 
          profile_picture={ this.state.userDetails.profilePicture } 
          center_image={ this.state.userDetails.profilePicture === default_profile_picture ? true : false } 
          size='sm'
          is_button={false}
          />
        </div>
        <div className='user-profile-details'>
          <h2> { this.state.userDetails.fullname } </h2>
          <p> { this.state.userDetails.description } </p>
        </div>
        {content}
      </div>
    )
  }
};

export default User;