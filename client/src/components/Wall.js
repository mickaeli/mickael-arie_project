import React, { Component } from 'react';

import Post from './Post';

import './Wall.css';

class Wall extends Component {
  render() {
    return (
      <div className='wall'>
        <textarea className='box' placeholder="Post something" name="post-text" rows="10"></textarea>
        <Post />
        <Post />
      </div>
    );
  }
}

export default Wall;