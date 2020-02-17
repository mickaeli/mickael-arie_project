import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//import axios from 'axios';

import Home from './components/Home'
import Footer from './components/Footer';
import HomeHeader from './components/HomeHeader';
import About from './components/About';
import NotFound from './components/NotFound';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <HomeHeader />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            { localStorage.isAuthenticated && <Route exact path='/dashboard' component={Dashboard} /> }
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </BrowserRouter>
    );
  }
}

export default App;