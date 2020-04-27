import React, { Component } from 'react';

import './Wall.css';

class Wall extends Component {
  render() {
    return (
      <div className='wall'>
        <textarea placeholder="Post something" className='post-text' name="post-text" rows="10"></textarea>
        
      </div>
    );
  }
}

export default Wall;