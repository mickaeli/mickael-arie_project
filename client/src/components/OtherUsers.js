import React from 'react';
import { Button } from 'react-bootstrap'

import User from './User'

const OtherUsers = ({me, otherUsers, getOtherUsers, sendRequest}) => {
  return (
    <div>
      <div className='wrapper-button'>
        <Button
          className='button'
          variant="primary"
          onClick={getOtherUsers}
          >Click here to add a new friend
        </Button>
        <div className='users'>
          {otherUsers.map(otherUser => <div key={otherUser} ><User userType='otherUser' me={me} otherUser={otherUser} sendRequest={sendRequest} /> </div>)}
        </div>
      </div>
    </div>
  );
};

export default OtherUsers;