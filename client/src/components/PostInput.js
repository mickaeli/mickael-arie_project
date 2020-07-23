import React from 'react';
import { Button } from 'react-bootstrap'

const PostInput = ({postText, setPostText, sendPost}) => {
  return (
    <div className='post-input'>
      <textarea 
      className='box' 
      placeholder="Post something"
      value={postText} 
      onChange={setPostText} 
      name="post-text" 
      rows="10"
      />
      <div className='wrapper-button'>
        <Button
          className='button'
          variant="primary"
          onClick={sendPost}
          >Publish 
        </Button>
      </div>
    </div>
  );
};

export default PostInput;