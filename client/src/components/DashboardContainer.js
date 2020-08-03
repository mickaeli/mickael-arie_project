import React, { Component, Fragment } from 'react';
import {Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'

import DashboardHeader from './DashboardHeader';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Friends from './Friends';
import Photos from './Photos';
import NotFound from './NotFound'
import ChatManager from './ChatManager'

import { AccountContext } from '../Context'

const ENDPOINT = 'http://localhost:5000';

class DashboardContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn')),
      contextValue: {
        socket: io(ENDPOINT),
        friends: [],
        setFriends: this.setFriends
      }
    }
  }

  componentDidMount() {

    if(this.state.userDetails.newUser){
      this.state.contextValue.socket.emit('newUser', { user: this.state.userDetails.username } )
    }
    
    axios.get(`/friends/connections/${this.state.userDetails.username}`)
    .then(res => {
      if(res.data.success) {
        const contextValue = this.state.contextValue
        contextValue.friends = res.data.friendsList
        this.setState({
          contextValue
        })
      }
    })
    .catch(err => {
      console.log('get friends error: ', err);
    })
  }
  

  componentWillUnmount() {
    this.state.contextValue.socket.close()
  }

  setFriends = value => {
    const contextValue = this.state.contextValue
    contextValue.friends = value
    this.setState({
      contextValue
    })
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