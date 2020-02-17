import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Link, NavLink, withRouter} from 'react-router-dom';

import './HomeHeader.css';
import logo from '../img/logo.png';

const HomeHeader = props => {
      //if(props.location.pathname.match(/^(\/signup|\/signin)$/)) return null;
      if(props.location.pathname.match(/^(\/dashboard)$/) && localStorage.isAuthenticated) return null;
      return (
      <header>
        <Container fluid>
          <Row>
            <Col sm={4} md={3} lg={{ span: 3, offset: 1 }} xl={{ span: 2, offset: 1 }}>
              <Link to='/'><img className="logo" src={logo} alt="Gooder - social network for good actions" /></Link>
            </Col> 
            <Col sm={4} md={4} lg={3} xl={{ span: 2, offset: 1 }}>
              <nav className="main-nav">
                <ul>
                  <li>
                    <NavLink
                      exact
                      to="/"
                      activeClassName='link-active'
                      className='link'
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/about"
                      activeClassName='link-active'
                      className='link'
                    >
                      About
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col sm={4} md={5} lg={4} xl={{ span: 3, offset: 2 }}>
              <div className='buttons'>
                <Link to='/signin'> <Button className='button' variant="outline-light" size="sm">Sign in</Button> </Link>
                <Link to='/signup'> <Button className='button' variant="primary" size="sm">Sign Up</Button> </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
  );
};

export default withRouter(HomeHeader);