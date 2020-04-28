import React from 'react';

import { Button } from 'react-bootstrap'
import Comment from './Comment'

import './Post.css'

const Post = () => {
  return (
    <div className='post box'>
      <h1 className='post-author' >author</h1>
      <p className='post-text' >text</p>
      <div className='float-right'>
        <Button
        className='button'
          variant='info'
        >Delete </Button>
        <Button
          className='button'
          variant='light'
        >Edit </Button>
      </div>
      <textarea className='box' placeholder="Reply"></textarea>
      <h2 className='comment-header'><span>Comments</span></h2>
      <Comment />
      <Comment />
    </div>
  );
};

export default Post;