import React, { useState } from 'react';
import { Button } from 'react-bootstrap'

import User from './User'

const OtherUsers = ({otherUsers, getOtherUsers, sendRequest}) =>  {

  const [clickOnButton, setClickOnButton] = useState(false);

  const handleClick = () => {
    getOtherUsers()
    setClickOnButton(true) 
  }

    let content = null
    if(clickOnButton) {
      if(otherUsers.length > 0) {
        content = (<div className='users'>
                  {
                    otherUsers.map(otherUser => <div key={otherUser} ><User userType='otherUser' otherUser={otherUser} sendRequest={sendRequest} /> </div>)
                  }
                  </div>)
      } else {
        content = (<p className='text-center'>No other users exist</p>)
      }
    }

    return (


      <div>
        <div className='wrapper-button'>
          <Button
            className='button'
            variant="primary"
            onClick={handleClick}
            >Click here to add a new friend
          </Button>
        </div>  
        {
          otherUsers.length > 0 &&
          <h1>Others</h1>
        }
        { content }
        
      </div>
    );
  
}

export default OtherUsers;