import React, { Component } from 'react';
import './Header.css';
import './DashboardHeader.css'
import logo from '../img/logo.png'

import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {Link, NavLink, withRouter} from 'react-router-dom';

class DashboardHeader extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    //this.props.userLogin(false)
    sessionStorage.setItem('isLoggedIn', false)
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  render() {
    if(!this.props.location.pathname.match(/^(\/dashboard)/)) return null;
    return(
      <header className='dashboard-header'>
        <Navbar className='dash-navbar' expand='lg'>
          <Link to='/dashboard' className='mr-3'>
            <img src={logo} alt="Gooder logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <NavLink exact to="/dashboard" activeClassName='link-active' className='link'>Home</NavLink>
              <NavLink exact to="/dashboard/profile" activeClassName='link-active' className='link'>Profile</NavLink>
              <NavLink exact to="/dashboard/friends" activeClassName='link-active' className='link'>Friends</NavLink>
              <NavLink exact to="/dashboard/groups" activeClassName='link-active' className='link'>Groups</NavLink>
              <NavLink exact to="/dashboard/photos" activeClassName='link-active' className='link'>Photos</NavLink>
            </Nav>
            <Form inline className='mr-4 search-form'>
              <FormControl type="text" placeholder="Search" className="mr-2 input-form" />
              <Button variant="info">Search</Button>
            </Form>
            <Link to='/'>
              <Button className='signout-button' variant="light" onClick={this.handleClick}>Sign out</Button>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
};

export default withRouter(DashboardHeader);