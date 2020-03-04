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

    // this.state = {
    //   intervalSession : {}
    // }
    
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    //this.handleSession = this.handleSession.bind(this);
  }

  handleLogout(event){
    if (event.key === 'logout-event') {
      this.props.history.push('/')
    }
  }

  handleLogin(event){
    if (event.key === 'login-event') {
      this.props.history.push('/dashboard')
    }
  }
  
  componentDidMount(){
    window.addEventListener('storage', this.handleLogout)
    window.addEventListener('storage', this.handleLogin)
    //this.setState({ intervalSession: intervalSession })
    //this.handleSession()
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleLogout)
    window.removeEventListener('storage', this.handleLogin)
  }

  render() {

    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

    return (
      <Fragment>
        <HomeHeader />
        <DashboardHeader />
        <Switch>

          <Route exact path='/' render={props => !isLoggedIn ? (<Home {...props} />) : (<Redirect to='/dashboard' />)} />
          <Route exact path='/about' render={props => !isLoggedIn ? (<About {...props} />) : (<Redirect to='/dashboard' />)} />
          <Route exact path='/signup' render={props => !isLoggedIn ? (<Signup {...props} />) : (<Redirect to='/dashboard' />)} />
          <Route exact path='/signin' render={props => !isLoggedIn ? (<Signin {...props} />) : (<Redirect to='/dashboard' />)} />

          <PrivateRoute exact path='/dashboard' component={Dashboard} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/dashboard/profile' component={Profile} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/dashboard/friends' component={Friends} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/dashboard/groups' component={Groups} isLoggedIn={isLoggedIn} />
          <PrivateRoute exact path='/dashboard/photos' component={Photos} isLoggedIn={isLoggedIn} />

          <Route component={NotFound} />

        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);