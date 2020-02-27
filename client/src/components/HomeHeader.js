import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import {Link, NavLink, withRouter} from 'react-router-dom';

import './Header.css';
import './HomeHeader.css';
import logo from '../img/logo.png';

const HomeHeader = (props) => {

    if(props.location.pathname.match(/^(\/dashboard)/)) return null;

    return (
      <header className='home-header'>
        <Navbar className='home-navbar' bg='dark' variant='dark' expand='lg'>
          <Link to='/' className='mr-3'>
            <img src={logo} alt="Gooder logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <NavLink exact to="/" activeClassName='link-active' className='link'>Home</NavLink>
              <NavLink exact to="/about" activeClassName='link-active' className='link'>About</NavLink>
            </Nav>
            <Link to='/signin'> <Button className='button' variant="outline-light" size="sm">Sign in</Button> </Link>
            <Link to='/signup'> <Button className='button' variant="primary" size="sm">Sign up</Button> </Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
}

export default withRouter(HomeHeader);