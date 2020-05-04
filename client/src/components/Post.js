import React from 'react';

import { Button } from 'react-bootstrap'
import Comment from './Comment'

import './Post.css'

const Post = (props) => {

  const { id, text, author } = props.data

  const deletePost = () => {
    console.log(id)
    props.deletePost(id)
  }
  
  return (
    <div className='post box'>
      <h1 className='post-author' >{ author }</h1>
      <p className='post-text' >{ text }</p>

      {/* check whether author of the post is the user logged in now */}
      { author === props.username ? 

        <div className='float-right'>
          <Button
          className='button'
          variant='info'
          onClick={deletePost}
          >Delete </Button>
          <Button
            className='button'
            variant='light'
          >Edit </Button>
        </div>
        : null
      }

      <textarea className='box' placeholder="Reply"></textarea>
      <h2 className='comment-header'><span>Comments</span></h2>
      {/* <Comment /> */}
    </div>
  );
};

export default Post;