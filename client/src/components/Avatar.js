import React from 'react';

import './Avatar.css'

const Avatar = (props) => {

  let size

  switch (props.size) {
    case 'lg':
      size = '10rem'
      break;
    case 'sm':
      size = '5rem'
      break;
    default:
      break;
  }

  return (
    
      props.is_button ? 
        (<button 
          className='avatar' style= { { 
          backgroundImage: props.profile_picture ? `url(${props.profile_picture})` : '',
          backgroundSize: props.center_image ? '' : 'cover',
          width: `${size}`,
          height:  `${size}`
          } }>
        </button>) : 
        (<div
          className='avatar' style= { { 
          backgroundImage: props.profile_picture ? `url(${props.profile_picture})` : '',
          backgroundSize: props.center_image ? '' : 'cover',
          width: `${size}`,
          height:  `${size}` 
          } } />)
    
  )
}

export default Avatar;