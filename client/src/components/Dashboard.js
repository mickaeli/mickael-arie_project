import React, { Component } from 'react';

class Dashboard extends Component {
  componentDidMount() {
    document.title = 'Gooder - Dashboard'
  }

  render() {
    return (
      <div className='dashboard'>
        <h1>dash board</h1>
      </div>
    );
  }
}

export default Dashboard;