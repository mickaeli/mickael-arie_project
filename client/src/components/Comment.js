import React from 'react';

import PostHeader from './PostHeader'
import PostBody from './PostBody'

import './Comment.css'

const Comment = ({data}) => {
  return (
    <div className='comment box'>
      <PostHeader data={ { profilePicture: data.profilePicture, author: data.author, date: data.date } } />
      <PostBody post_text={data.text} />
    </div>
  );
};

export default Comment;