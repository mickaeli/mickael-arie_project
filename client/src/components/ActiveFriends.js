import React, { Component } from 'react';

import closeIcon from '../img/closeIcon.png';

import ActiveUser from './ActiveUser'

import './ActiveFriends.css'

class ActiveFriends extends Component {

  render() {
    return (
      <div className="active-friends">
        <div className="info-bar">
          <h1>Friends connected</h1>
          <button className='close-icon' onClick={this.props.hideActiveFriends} >
            <img src={closeIcon} alt="close icon"/>
          </button>
        </div>
        {
          this.props.activeFriends.length > 0 
          ?
          this.props.activeFriends.map((name) => (
            <div key={name}>
              < ActiveUser user={name} />
            </div>)
          )
          :
          <p className='no-friends-connected'>No friends connected</p>
        }
      </div>
    );
  }
}

export default ActiveFriends;