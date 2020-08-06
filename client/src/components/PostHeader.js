import React from 'react';

import UserDetails from './UserDetails';

import { getDateAndTime } from '../utils';

import './PostHeader.css'

//this component represents the header for both the post and the comment
const PostHeader = (props) => {

  let author = props.data.author
  let profilePicture = props.data.profilePicture

  if(props.data.isAnonymous){

    author = 'Anonymous'
    profilePicture = 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png'
  }

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
        userDetails={{fullname: author, profilePicture: profilePicture, description: '' }}
        isAnonymous = {props.data.isAnonymous}
      />
      <p className='float-right'>{
        props.data.post_edited ? [ <strong key={'edited'}>edited</strong>, ' - ', getDateAndTime(new Date(props.data.date)) ] : getDateAndTime(new Date(props.data.date))
      }</p>
    </div>
  );
};

export default PostHeader;