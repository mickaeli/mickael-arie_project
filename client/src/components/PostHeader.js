import React from 'react';

import UserDetails from './UserDetails';

import { getDateAndTime } from '../utils';

import './PostHeader.css'

//this component represents the header for both the post and the comment
const PostHeader = (props) => {

  return (
    <div className='post-header'>
      <UserDetails 
        username={props.data.username} 
        fullnameTag='h1' 
        fullnameSize='1.3rem' 
        picture={true} 
        pictureSize='xs' 
        description={false} 
        callToServer={false} 
        userDetails={{fullname: props.data.author, profilePicture: props.data.profilePicture, description: '' }}
      />
      <p className='float-right'>{
        props.data.post_edited ? [ <strong key={'edited'}>edited</strong>, ' - ', getDateAndTime(new Date(props.data.date)) ] : getDateAndTime(new Date(props.data.date))
      }</p>
    </div>
  );
};

export default PostHeader;