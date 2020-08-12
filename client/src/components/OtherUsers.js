import React from 'react';

import User from './User'

const OtherUsers = ({otherUsers, sendRequest}) =>  {

    return (

      <div>
        <h1>Others</h1>
        <div className='users'>
          {otherUsers.map(otherUser => <div key={otherUser} ><User userType='otherUser' otherUser={otherUser} sendRequest={sendRequest} /> </div>)}
        </div>
      </div>
    );
  
}

export default OtherUsers;