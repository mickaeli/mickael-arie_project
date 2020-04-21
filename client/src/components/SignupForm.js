import React from "react";
import { TextField } from "@material-ui/core";
import {Container, Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './ConnectionForm.css';

const SignupForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => {
  return (
    <Container fluid className='connection-form'>
      <Row>
        <Col sm={{ offset: 4, span : 4}} className='col'>
        {/* errors.message is error that returns from server */}
        {errors.message && <p style={{ color: "red", textAlign: 'center' }}>{errors.message}</p>}
          <form onSubmit={onSubmit}>
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
              name="fullname"
              label="full name"
              value={user.fullname}
              onChange={onChange}
              helperText={errors.fullname}
              fullWidth
              margin='dense'
              error={errors.fullname !== undefined}
            />
            <TextField
              name="email"
              label="email"
              value={user.email}
              onChange={onChange}
              helperText={errors.email}
              fullWidth
              margin='dense'
              error={errors.email !== undefined}
            />
            <TextField
              type='password'
              name="password"
              label="password"
              value={user.password}
              onChange={onChange}
              helperText={ errors.password ? errors.password : 'Password must have at least 8 characters and one uppercase'}
              fullWidth
              margin='dense'
              error={errors.password !== undefined}
            />
            <TextField
              type='password'
              name="pwconfirm"
              label="confirm password"
              value={user.pwconfirm}
              onChange={onChange}
              helperText={errors.pwconfirm}
              fullWidth
              margin='dense'
              error={errors.pwconfirm !== undefined}
            />
            <Button 
              className='button' 
              variant="primary" 
              size="lg" 
              type="submit"
              style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
              > Sign up
            </Button>
          </form>
          <p style={{marginTop: '8px', textAlign: 'center'}}>
            Already have an account? <br />
            <Link to='/signin'>Log in here</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;