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
    // const now = new Date().getTime()
    // const details_connexion = JSON.parse(localStorage.getItem('isLoggedIn'))
    // if(!details_connexion || !details_connexion.timestamp || details_connexion.timestamp < now) {
    //   localStorage.setItem('isLoggedIn', false)

      localStorage.setItem('isLoggedIn', false)
      //this.props.history.push('/')
  }

  handleSession(event) {
    console.log('the storage changed')
  }

  // handleSession(event){
  //   console.log('I am in handleSession')
  //   if (event.key === 'isLoggedIn') {
  //     const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  //     if(isLoggedIn === true) {
  //       this.props.history.push('/dashboard')
  //       const timeoutSession = setTimeout(this.destroySession, 1000*20)
  //       this.setState({ timeoutSession: timeoutSession })

  //     } else {
  //         clearTimeout(this.state.timeoutSession)
  //         this.props.history.push('/')
  //     }
  //   }
  // }
  
  componentDidMount(){
    console.log('app.js went mount')
    window.addEventListener('storage', this.handleSession)
    //window.addEventListener('storage', this.handleLogout)
    //this.setState({ intervalSession: intervalSession })
    //this.handleSession()
  }

  componentWillUnmount() {
    console.log('app.js went unmount')
    window.removeEventListener('storage', this.handleSession)
    //window.removeEventListener('storage', this.handleLogout)
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