import React, { Component, Fragment } from 'react';
import {Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'

import DashboardHeader from './DashboardHeader';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Friends from './Friends';
import Groups from './Groups';
import Photos from './Photos';
import NotFound from './NotFound'
import ChatManager from './ChatManager'

import { AccountContext } from '../Context'

const ENDPOINT = 'http://localhost:5000';

class DashboardContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contextValue: {
        socket: io(ENDPOINT),
        username: this.props.match.params.username,
        fullname: JSON.parse(localStorage.getItem('isLoggedIn')).fullname
      }
    }
  }

  componentWillUnmount() {
    this.state.contextValue.socket.close()
  }

  render() { 

    return (
      <Fragment>
        <AccountContext.Provider value={this.state.contextValue}>
          <DashboardHeader urlPrefix={this.props.match.url} />
          
          <Switch>
            <Route exact path={`${this.props.match.path}`} component={Dashboard} />
            <Route exact path={`${this.props.match.path}/profile`} component={Profile} />
            <Route exact path={`${this.props.match.path}/friends`} component={Friends} />
            <Route exact path={`${this.props.match.path}/groups`} component={Groups} />
            <Route exact path={`${this.props.match.path}/photos`} component={Photos} />
            <Route component={NotFound} />
          </Switch>
          
          <ChatManager />
        </AccountContext.Provider>
        
      </Fragment> 
    );
  }
}

export default DashboardContainer;