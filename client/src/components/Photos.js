import React, { Component } from 'react';

class Photos extends Component {

  componentDidMount() {
    document.title = 'Dashboard - Photos'
  }
  
  render() {
    return (
      <div className='account'>
        <h1>photos</h1>
      </div>
    );
  }
}

export default Photos;