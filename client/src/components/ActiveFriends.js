import React from 'react';

import ActiveUser from './ActiveUser'
import InfoBar from './InfoBar'

import './ActiveFriends.css'

const ActiveFriends = ({activeFriends, hideActiveFriends, rooms, openChat, closeChat}) => {

  return (
    <div>
      <InfoBar header={'Friends Connected'} closeFunction={hideActiveFriends} isplusIcon={false} />
      <div className="active-friends">
        {
          activeFriends.length > 0 
          ?
          <div className='active-friends-container'>
            {
              activeFriends.map((friend) => (<div key={friend}> < ActiveUser friend={friend} rooms={rooms} openChat={openChat} closeChat={closeChat} /> </div>))
            }
          </div>
          :
          <p className='no-friends-connected'>No friends connected</p>
        }
      </div>
    </div>
  );
}

export default ActiveFriends;