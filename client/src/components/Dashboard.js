import React, { Component } from 'react';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeoutSession : {}
    }
    
    this.handleSession = this.handleSession.bind(this);
  }

  handleSession(){
    // const now = new Date().getTime()
    // const details_connexion = JSON.parse(localStorage.getItem('isLoggedIn'))
    // if(!details_connexion || !details_connexion.timestamp || details_connexion.timestamp < now) {
    //   localStorage.setItem('isLoggedIn', false)

      localStorage.setItem('isLoggedIn', false)
      localStorage.setItem('logout-event', 'logout ' + new Date().getTime());
      this.props.history.push('/')
  }

  componentDidMount() {
    document.title = 'Gooder - Dashboard'
    const timeoutSession = setTimeout(this.handleSession, 1000*20)
    this.setState({ timeoutSession: timeoutSession })
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutSession)
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