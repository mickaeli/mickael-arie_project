import React from 'react';

import User from './User'

const Connections = ({requestsSent, friends, deleteFriend}) => {
  return (
    <div>
      <h1>Connections</h1>
      <div className='users'>
        {requestsSent.map(otherUser => <div key={otherUser} ><User userType='receiverRequest' otherUser={otherUser} /> </div>)}
        {friends.map(otherUser => <div key={otherUser} ><User userType='friend' otherUser={otherUser} deleteFriend={deleteFriend}/> </div>)}
      </div>
    </div>
  );
};

export default Connections;