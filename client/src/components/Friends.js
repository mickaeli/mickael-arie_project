import React, { Component } from 'react';

class Friends extends Component {

  componentDidMount() {
    document.title = 'Dashboard - friends'
  }
  
  render() {
    return (
      <div>
         <h1>friends</h1> 
      </div>
    );
  }
}

export default Friends;