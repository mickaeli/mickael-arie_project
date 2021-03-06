import React from 'react';

import {Navbar, Nav, Button} from 'react-bootstrap'
import {Link, NavLink} from 'react-router-dom';

import SearchForm from './SearchForm'

import logo from '../img/logo.png'

import './Header.css'
import './DashboardHeader.css'

const DashboardHeader = ({urlPrefix, ...props}) => {

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false)
    let event = new Event('storage')
    event.key = 'isLoggedIn'
    event.value = false
    window.dispatchEvent(event);
  }

  return(
    <header className='dashboard-header'>
      <Navbar className='dash-navbar' expand='lg'>
        <Link to={`${urlPrefix}`} className='mr-3'>
          <img src={logo} alt="Gooder logo" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavLink exact to={`${urlPrefix}`} activeClassName='link-active' className='link'>Home</NavLink>
            <NavLink exact to={`${urlPrefix}/profile`} activeClassName='link-active' className='link'>Profile</NavLink>
            <NavLink exact to={`${urlPrefix}/friends`} activeClassName='link-active' className='link'>Friends</NavLink>
          </Nav>
          <SearchForm urlPrefix={urlPrefix}/>
          <Link to='/'>
            <Button className='signout-button' variant="light" onClick={handleLogout}>Sign out</Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default DashboardHeader;