import React, {Component} from 'react';
import { Button } from 'react-bootstrap'

import axios from 'axios'

import Avatar from './Avatar'

import './ActiveUser.css'

class ActiveUser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userDetails: {
        fullname: '',
        profilePicture: ''
      }
    }
  }

  componentDidMount() {
    
    axios.get(`/profile_details/${this.props.user}`) //get props.user
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
        <Button className='button'> chat </Button>
      </div>
      

    );
  }
}

export default ActiveUser;