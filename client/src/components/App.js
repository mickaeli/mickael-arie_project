import React, { Component, Fragment } from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'

import Home from './Home'
import Footer from './Footer';
import HomeHeader from './HomeHeader';
import About from './About';
import NotFound from './NotFound';
import Signup from './Signup';
import Signin from './Signin';
import Dashboard from './Dashboard';
import DashboardHeader from './DashboardHeader';
import Profile from './Profile';
import Friends from './Friends';
import Groups from './Groups';
import Photos from './Photos';
import PrivateRoute from './PrivateRoute'

class App extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      timeoutSession : {}
    }
    
    this.handleSession = this.handleSession.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }

  destroySession(){
      localStorage.setItem('isLoggedIn', false)
      let event = new Event('storage')
      event.key = 'isLoggedIn'
      event.value = false
      window.dispatchEvent(event);
  }

  handleSession(event){
    if (event.key === 'isLoggedIn') {
      const details_connection = JSON.parse(localStorage.getItem('isLoggedIn'))

      const isLoggedIn = details_connection.value
      const username = details_connection.username

      if(isLoggedIn === true) {
        this.props.history.push(`/dashboard/${username}`)
        const timeoutSession = setTimeout(this.destroySession, 1000*60*60*6)
        this.setState({ timeoutSession: timeoutSession })

      } else {
          clearTimeout(this.state.timeoutSession)
          this.props.history.push('/')
      }
    }
  }
  
  componentDidMount(){
    window.addEventListener('storage', this.handleSession)

    const details_connection = JSON.parse(localStorage.getItem('isLoggedIn'))

    if(details_connection) {
      const now = new Date().getTime()
      if(!details_connection.timestamp || (details_connection.timestamp + 1000*60*60*6) < now){
        localStorage.setItem('isLoggedIn', false)
        let event = new Event('storage')
        event.key = 'isLoggedIn'
        event.value = false
        window.dispatchEvent(event);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleSession)
  }

  render() {

    const details_connection = JSON.parse(localStorage.getItem('isLoggedIn'))
    const isLoggedIn = details_connection ? details_connection.value : false
    const username = details_connection.username ? details_connection.username : ''

    return (
      <Fragment>
        <HomeHeader />
        <DashboardHeader />
        <Switch>

          <Route exact path='/' render={props => !isLoggedIn ? (<Home {...props} />) : (<Redirect to={`/dashboard/${username}`} />)} />
          <Route exact path='/about' render={props => !isLoggedIn ? (<About {...props} />) : (<Redirect to={`/dashboard/${username}`} />)} />
          <Route exact path='/signup' render={props => !isLoggedIn ? (<Signup {...props} />) : (<Redirect to={`/dashboard/${username}`} />)} />
          <Route exact path='/signin' render={props => !isLoggedIn ? (<Signin {...props} />) : (<Redirect to={`/dashboard/${username}`} />)} />

          <PrivateRoute exact path={`/dashboard/:username`} component={Dashboard} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/dashboard/:username/profile' component={Profile} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/dashboard/:username/friends' component={Friends} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/dashboard/:username/groups' component={Groups} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/dashboard/:username/photos' component={Photos} isLoggedIn={isLoggedIn} />

          <Route component={NotFound} />

        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);