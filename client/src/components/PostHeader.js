import React from 'react';

import Avatar from './Avatar'

import { getDateAndTime } from '../utils';

import './PostHeader.css'

//this component represents the header for both the post and the comment
const PostHeader = (props) => {

  const default_profile_picture = 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png'

  return (
    <div className='post-header'>
      <div className='picture-author'>
        <div>
          <Avatar 
          profile_picture={ props.data.profilePicture } 
          center_image={ props.data.profilePicture === default_profile_picture ? true : false } 
          size= 'xs'
          is_button={false}
          />
        </div>
        
        <h1>{ props.data.author }</h1>
      </div>
      <p className='float-right'>{
        props.data.post_edited ? [ <strong key={'edited'}>edited</strong>, ' - ', getDateAndTime(new Date(props.data.date)) ] : getDateAndTime(new Date(props.data.date))
      }</p>
    </div>
  );
};

export default PostHeader;