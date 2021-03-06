import React, { Component } from 'react';

import axios from 'axios'

import Avatar from './Avatar'

import { AccountContext } from '../Context'

import './UserDetails.css'

class UserDetails extends Component {

  constructor(props) {
    super(props)

    this.signal = axios.CancelToken.source();

    this.state = {
      userDetails: {
        fullname: '',
        profilePicture: '',
        description: ''
      }
    }
  }

  componentDidMount() {

    this.context.socket.on('userDetailsModified', ({user, fullname, description}) => {
      if(user === this.props.username && !this.props.isAnonymous){
        this.setState({
          userDetails: {...this.state.userDetails, fullname, description}
        })
      }
    })

    this.context.socket.on('profilePictureModified', ({user, profilePicture}) => {
      if(user === this.props.username && !this.props.isAnonymous){
        this.setState({
          userDetails: {...this.state.userDetails, profilePicture}
        })
      }
    })
    
    if(this.props.callToServer){
      axios.get(`/profile_details/${this.props.username}`, {
        cancelToken: this.signal.token
      })
      .then(res => {
        if(res.data.success === true) {
          this.setState({
            userDetails: Object.assign({}, res.data.userDetails )
          })
        }
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Error: ', err.message); // => prints: Api is being canceled in UserDetails
        } else {
          console.log('get profile_details error: ', err);
        }
        
      })
    } else {
      this.setState({
        userDetails: this.props.userDetails
      })
    }
    
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled in UserDetails');
    this.context.socket.off('userDetailsModified');
    this.context.socket.off('profilePictureModified');
  }


  render() {

    const default_profile_picture = 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png'

    let fullname
    if(this.props.fullnameTag === 'h1') {
      fullname = (<h1 style={{fontSize: this.props.fullnameSize, marginBottom: !this.props.isAnonymous ? 0 : ''}} > { this.state.userDetails.fullname } </h1>)

    } else if(this.props.fullnameTag === 'h2') {
      fullname = (<h2> { this.state.userDetails.fullname } </h2>)

    }
    else if(this.props.fullnameTag === 'p') {
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
            !this.props.isAnonymous ? 
            <p className='username'>@{this.props.username}</p> : ''
          }
          
          {
            this.props.description ? (<p className='description'> { this.state.userDetails.description } </p>) : ''
          }
        </div>
      </div>
    );
  }
}

UserDetails.contextType = AccountContext;

export default UserDetails;