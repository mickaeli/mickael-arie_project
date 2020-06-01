import React from 'react';

import User from './User'

const Invitations = ({me, requests, acceptRequest, rejectRequest}) => {
  return (
    <div>
      <h1>Invitations</h1>
      <div className='users bg-blue'>
        {requests.map(otherUser => <div key={otherUser} ><User userType='senderRequest' otherUser={otherUser} me={me}  acceptRequest={acceptRequest} rejectRequest={rejectRequest} /> </div>)}
      </div>
    </div>
  );
};

export default Invitations;