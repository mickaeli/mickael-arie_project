import React, { Component, Fragment } from 'react';
import {Route, Switch} from 'react-router-dom'

import DashboardHeader from './DashboardHeader';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Friends from './Friends';
import Groups from './Groups';
import Photos from './Photos';
import NotFound from './NotFound'
import ChatManager from './ChatManager'

class DashboardContainer extends Component {
  render() {

    return (
      <Fragment>
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
        
      </Fragment> 
    );
  }
}

export default DashboardContainer;