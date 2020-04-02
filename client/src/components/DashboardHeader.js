import React, { Component } from 'react';
import './Header.css';
import './DashboardHeader.css'
import logo from '../img/logo.png'

import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {Link, NavLink, withRouter} from 'react-router-dom';

class DashboardHeader extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.setItem('isLoggedIn', false)
    let event = new Event('storage')
    event.key = 'isLoggedIn'
    event.value = false
    window.dispatchEvent(event);
  }

  render() {
    const details_connexion = JSON.parse(localStorage.getItem('isLoggedIn'))

    if(!details_connexion.value) return null;
    const username = details_connexion.username ? details_connexion.username : ''
    


    return(
      <header className='dashboard-header'>
        <Navbar className='dash-navbar' expand='lg'>
          <Link to='/dashboard' className='mr-3'>
            <img src={logo} alt="Gooder logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <NavLink exact to={`/dashboard/${username}`} activeClassName='link-active' className='link'>Home</NavLink>
              <NavLink exact to={`/dashboard/${username}/profile`} activeClassName='link-active' className='link'>Profile</NavLink>
              <NavLink exact to={`/dashboard/${username}/friends`} activeClassName='link-active' className='link'>Friends</NavLink>
              <NavLink exact to={`/dashboard/${username}/groups`} activeClassName='link-active' className='link'>Groups</NavLink>
              <NavLink exact to={`/dashboard/${username}/photos`} activeClassName='link-active' className='link'>Photos</NavLink>
            </Nav>
            <Form inline className='mr-4 search-form'>
              <FormControl type="text" placeholder="Search" className="mr-2 input-form" />
              <Button variant="info">Search</Button>
            </Form>
            <Link to='/'>
              <Button className='signout-button' variant="light" onClick={this.handleLogout}>Sign out</Button>
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
};

export default withRouter(DashboardHeader);