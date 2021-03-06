import React from 'react';

import PostHeader from './PostHeader'
import PostBody from './PostBody'

import './Comment.css'

const Comment = ({data}) => {
  return (
    <div className='comment box'>
      <PostHeader data={ 
        { username: data.authorUsername, 
          profilePicture: data.profilePicture, 
          author: data.authorFullname, 
          date: data.date,
          isAnonymous: data.isAnonymous } } />
      <PostBody post_text={data.text} />
    </div>
  );
};

export default Comment;