import React from 'react';
import './Header.css';
import './DashboardHeader.css'
import logo from '../img/logo.png'

import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {Link, NavLink} from 'react-router-dom';

const DashboardHeader = ({urlPrefix}) => {

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
            <NavLink exact to={`${urlPrefix}/photos`} activeClassName='link-active' className='link'>Photos</NavLink>
          </Nav>
          <Form inline className='mr-4 search-form'>
            <FormControl type="text" placeholder="Search" className="mr-2 input-form" />
            <Button variant="info">Search</Button>
          </Form>
          <Link to='/'>
            <Button className='signout-button' variant="light" onClick={handleLogout}>Sign out</Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default DashboardHeader;