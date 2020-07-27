import React from "react";
import {Link} from 'react-router-dom'

import { TextField } from "@material-ui/core";
import {Container, Row, Col, Button} from 'react-bootstrap'


import './ConnectionForm.css';

const SigninForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => {
  return (
      <Container fluid className='connection-form' style={{paddingBottom : '300px'}}>
        <Row>
          <Col sm={{ offset: 4, span : 4}} className='col'>
            {errors.message && <p style={{ color: "red", textAlign: 'center' }}>{errors.message}</p>}
            <form onSubmit={onSubmit} style={{marginBottom: '20px'}}>
                <TextField
                  name="username"
                  label="user name"
                  value={user.username}
                  onChange={onChange}
                  helperText={errors.username}
                  fullWidth
                  margin='dense'
                  error={errors.username !== undefined}
                />
                <TextField
                  type='password'
                  name="password"
                  label="password"
                  value={user.password}
                  onChange={onChange}
                  helperText={errors.password}
                  fullWidth
                  margin='dense'
                  error={errors.password !== undefined}
                />
                <Button 
                  className='button' 
                  variant="primary" 
                  size="lg" 
                  type="submit"
                  style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
                  > Sign in
                </Button>
            </form>
            <p style={{marginTop: '8px', textAlign: 'center'}}>
              Need to register? <br />
              <Link to='/signup'>Sign up here</Link>
            </p>
          </Col>
        </Row>
      </Container>
  );
};

export default SigninForm;