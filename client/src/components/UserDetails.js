import React, { Component } from 'react';

import axios from 'axios'

import Avatar from './Avatar'

import './UserDetails.css'

class UserDetails extends Component {

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
    
    axios.get(`/profile_details/${this.props.username}`)
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

    let fullname
    if(this.props.fullname === 'h1') {
      fullname = (<h1> { this.state.userDetails.fullname } </h1>)

    } else if(this.props.fullname === 'h2') {
      fullname = (<h2> { this.state.userDetails.fullname } </h2>)

    }
    else if(this.props.fullname === 'p') {
      fullname = (<p className='fullname'> { this.state.userDetails.fullname } </p>)
    }


    return (
      <div className='user-details'>
        {
          this.props.picture ?
          <div>
          <Avatar 
          profile_picture={ this.state.userDetails.profilePicture } 
          center_image={ this.state.userDetails.profilePicture === default_profile_picture ? true : false } 
          size= { this.props.pictureSize }
          is_button={false}
          />
        </div> : ''
        }
        <div>
          {fullname}
          {
            this.props.description ? (<p className='description'> { this.state.userDetails.description } </p>) : ''
          }
        </div>
      </div>
    );
  }
}

export default UserDetails;