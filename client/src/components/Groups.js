import React, { Component } from 'react';

class Groups extends Component {

  componentDidMount() {
    document.title = 'Dashboard - groups'
  }
  
  render() {
    return (
      <div className='account'>
        <h1>groups</h1>   
      </div>
    );
  }
}

export default Groups;