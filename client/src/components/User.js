import React from 'react';

import FriendsButton from './FriendsButton'
import UserDetails from './UserDetails'

import './User.css'

const User = ({otherUser, userType, acceptRequest, rejectRequest, sendRequest}) => {

    let button

    switch (userType) {
      case 'senderRequest':
        button = (<FriendsButton userType={userType} acceptRequest={acceptRequest} rejectRequest={rejectRequest} otherUser={otherUser} />)
        break;
      case 'receiverRequest':
      case 'friend':
        button = (<FriendsButton userType={userType} />)
        break;
      case 'otherUser':
        button = (<FriendsButton userType={userType} sendRequest={sendRequest} otherUser={otherUser} />)
        break;
      default:
        break;
    }

    return (

      <div className='user'>
        <UserDetails username={otherUser} fullnameTag='h2' picture={true} pictureSize='sm' description={true} callToServer={true} />
        {button}
      </div>
    )
};

export default User;