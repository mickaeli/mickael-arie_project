import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';

import './Header.css';
import logo from '../img/logo.png';

const Header = props => {
      if (props.location.pathname.match(/^(\/signup|\/signin|\/dashboard)$/)) return null;
      return (
      <header>
        <Container fluid>
          <Row>
            <Col xs={12} sm={4} lg={{ span: 3, offset: 2 }} xl={{ span: 2, offset: 1 }}>
              <Link to='/' className="logo"><img src={logo} alt="Gooder - social network for good actions" /></Link>
            </Col> 
            <Col xs={12} sm={3} lg={1} xl={3}>
              <nav className="main-nav">
                <ul>
                  <li>
                    <Link className='link' to='/' >Home</Link>
                  </li>
                  <li>
                    <Link className='link' to='/about' >About</Link>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col xs={12} sm={{ span: 3, offset: 2 }} lg={{ span: 2, offset: 2 }} xl={{ span: 3, offset: 2 }}>
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

export default withRouter(Header);