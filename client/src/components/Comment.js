import React from 'react';

import PostHeader from './PostHeader'
import PostBody from './PostBody'

import './Comment.css'

const Comment = (props) => {
  return (
    <div className='comment box'>
      <PostHeader data={ { profilePicture: props.data.profilePicture, author: props.data.author, date: props.data.date } } />
      <PostBody post_text={props.data.text} />
    </div>
  );
};

export default Comment;