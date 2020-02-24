import React, { Component } from 'react';

class Dashboard extends Component {
  componentDidMount() {
    document.title = 'Gooder - Dashboard'
  }

  render() {
    return (
      <div className='dashboard'>
      </div>
    );
  }
}

export default Dashboard;