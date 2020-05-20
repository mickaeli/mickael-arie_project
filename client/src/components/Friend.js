import React from 'react';
import { Button } from 'react-bootstrap'

import Avatar from './Avatar'

import './Friend.css'

const Friend = (props) => {

  const default_profile_picture = 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png'

  return (
    <div className='friend'>
      <Avatar 
        profile_picture={ props.data.profile_picture } 
        center_image={ props.data.profile_picture === default_profile_picture ? true : false } 
        size='sm'
        is_button={false}
      />
      <div>
        <h2 style = {{ marginBottom: '.5rem' }}> {props.data.fullname} </h2>
        <p> {props.data.description} </p>
      </div>
      <div className='buttons-manage-friends'>
        {/* <Button
          className='button'
          variant="light"
          disabled
          >Pending
        </Button>
        <Button
          className='button'
          variant="info"
          >Connect
        </Button>
        <Button
          className='button'
          variant="outline-secondary"
          >Ignore
        </Button>
        <Button
          className='button'
          variant="outline-info"
          >Accept
        </Button> */}
      </div>

      
      
    </div>
  );
};

export default Friend;