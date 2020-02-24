import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

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
import ScrollToTop from './ScrollToTop'
import PrivateRoute from './PrivateRoute'

//redux
import { connect } from 'react-redux'


const App = ({isLoggedIn, ...props}) => {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <HomeHeader />
          <DashboardHeader />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />

            <PrivateRoute exact path='/dashboard' component={Dashboard} isLoggedIn={isLoggedIn} />
            <PrivateRoute exact path='/dashboard/profile' component={Profile} isLoggedIn={isLoggedIn} />
            <PrivateRoute exact path='/dashboard/friends' component={Friends} isLoggedIn={isLoggedIn} />
            <PrivateRoute exact path='/dashboard/groups' component={Groups} isLoggedIn={isLoggedIn} />
            <PrivateRoute exact path='/dashboard/photos' component={Photos} isLoggedIn={isLoggedIn} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(App);