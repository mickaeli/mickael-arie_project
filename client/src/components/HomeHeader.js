import React, {Component} from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import {Link, NavLink, withRouter} from 'react-router-dom';

import './Header.css';
import './HomeHeader.css';
import logo from '../img/logo.png';

//redux
import { connect } from 'react-redux'
import { userLogin } from '../actions/auth_action'

class HomeHeader extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.userLogin(false)
  }

  render() {

    if(this.props.location.pathname.match(/^(\/dashboard)/) && this.props.isLoggedIn) return null;

    let buttons = [];

    if(!this.props.isLoggedIn){
      buttons = [
        (<Link to='/signin'> <Button className='button' variant="outline-light" size="sm">Sign in</Button> </Link>),
        (<Link to='/signup'> <Button className='button' variant="primary" size="sm">Sign up</Button> </Link>)
      ]
    } else{
      buttons = [
        (<Link to='/dashboard'> <Button className='button' variant="outline-light" size="sm">Dash board</Button> </Link>),
        (<Link to='/'> <Button className='button' variant="primary" size="sm" onClick= {this.handleClick}>Sign out</Button> </Link>)
      ]
    }

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
            {buttons[0]}
            {buttons[1]}
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: isLoggedIn => {
      dispatch(userLogin(isLoggedIn))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));