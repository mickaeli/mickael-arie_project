import React, { Component, Fragment } from 'react';
import {Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'

import DashboardHeader from './DashboardHeader';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Friends from './Friends';
import NotFound from './NotFound'
import ChatManager from './ChatManager'
import SearchResults from './SearchResults'

import { AccountContext } from '../Context'

const ENDPOINT = 'http://localhost:5000';

class DashboardContainer extends Component {

  constructor(props) {
    super(props);

    this.signal = axios.CancelToken.source();

    this.state = {
      context: {
        userDetails: JSON.parse(localStorage.getItem('isLoggedIn')),
        socket: io(ENDPOINT),
        friends: [],
        setFriends: this.setFriends
      }
    }
  }

  componentDidMount() {

    this.setSocketEvents()

    if(this.state.context.userDetails.newUser){
      this.state.context.socket.emit('newUser', { user: this.state.context.userDetails.username } )
    }
    
    axios.get(`/friends/connections/${this.state.context.userDetails.username}`, {
      cancelToken: this.signal.token
    })
    .then(res => {
      if(res.data.success) {
        const context = this.state.context

        context.friends = res.data.friendsList

        this.setState({
          context
        })
      }
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled in DashboardContainer
      } else {
        console.log('get friends error: ', err);
      }
      
    })
  }

  componentWillUnmount() {
    this.state.context.socket.close()
    this.closeSocketEvents()
    this.signal.cancel('Api is being canceled in DashboardContainer');
  }

  setSocketEvents = () => {
    this.state.context.socket.on('userDetailsModified', ({user, fullname}) => {
      if(user === this.state.context.userDetails.username){
        let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
        isLoggedIn.fullname = fullname
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));

        this.setState({
          context: {...this.state.context, userDetails: isLoggedIn}
        })
      }
    })

    this.state.context.socket.on('profilePictureModified', ({user, profilePicture}) => {
      if(user === this.state.context.userDetails.username){
        let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
        isLoggedIn.profilePicture = profilePicture
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));

        this.setState({
          context: {...this.state.context, userDetails: isLoggedIn}
        })
      }
    })
  }

  closeSocketEvents = () => {
    this.context.socket.off('userDetailsModified');
    this.context.socket.off('profilePictureModified');
  }

  setFriends = value => {
    const context = this.state.context
    context.friends = value
    this.setState({
      context
    })
  }

  render() { 

    return (
      <Fragment>
        <AccountContext.Provider value={this.state.context}>
          <DashboardHeader urlPrefix={this.props.match.url} />
          
          <Switch>
            <Route exact path={`${this.props.match.path}`} component={Dashboard} />
            <Route exact path={`${this.props.match.path}/profile`} component={Profile} />
            <Route exact path={`${this.props.match.path}/friends`} component={Friends} />
            <Route exact path={`${this.props.match.path}/search`} component={SearchResults} />
            <Route component={NotFound} />
          </Switch>
          
          <ChatManager context={this.state.context}/>
        </AccountContext.Provider>
        
      </Fragment> 
    );
  }
}

export default DashboardContainer;