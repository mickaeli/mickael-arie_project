import React from 'react';

import User from './User'

const Connections = ({me, requestsSent, friendsList}) => {
  return (
    <div>
      <h1>Connections</h1>
      <div className='users'>
        {requestsSent.map(otherUser => <div key={otherUser} ><User userType='receiverRequest' me={me} otherUser={otherUser} /> </div>)}
        {friendsList.map(otherUser => <div key={otherUser} ><User userType='friend' me={me} otherUser={otherUser} /> </div>)}
      </div>
    </div>
  );
};

export default Connections;