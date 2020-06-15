import React, { Component } from 'react';


import ActiveUser from './ActiveUser'
import InfoBar from './InfoBar'

import './ActiveFriends.css'

class ActiveFriends extends Component {

  render() {
    return (
      <div className="active-friends">
        <InfoBar header={'Friends Connected'} closeFunction={this.props.hideActiveFriends} />
        {
          this.props.activeFriends.length > 0 
          ?
          <div className='active-friends-container'>
            {this.props.activeFriends.map((name) => (
            <div key={name}>
              < ActiveUser user={name} />
            </div>))}
          </div>
          :
          <p className='no-friends-connected'>No friends connected</p>
        }
      </div>
    );
  }
}

export default ActiveFriends;