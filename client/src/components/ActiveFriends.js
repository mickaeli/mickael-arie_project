import React from 'react';


import ActiveUser from './ActiveUser'
import InfoBar from './InfoBar'

import './ActiveFriends.css'

const ActiveFriends = ({activeFriends, hideActiveFriends, username, rooms, openChat, closeChat}) => {

  return (
    <div className="active-friends">
      <InfoBar header={'Friends Connected'} closeFunction={hideActiveFriends} />
      {
        activeFriends.length > 0 
        ?
        <div className='active-friends-container'>
          {
            activeFriends.map((friend) => (<div key={friend}> < ActiveUser username={username} friend={friend} rooms={rooms} openChat={openChat} closeChat={closeChat} /> </div>))
          }
        </div>
        :
        <p className='no-friends-connected'>No friends connected</p>
      }
    </div>
  );
}

export default ActiveFriends;