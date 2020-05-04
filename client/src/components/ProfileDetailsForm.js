import React from "react";
import { TextField } from "@material-ui/core";
import { Row, Col, Button} from 'react-bootstrap'
import './ProfileDetailsForm.css';

const ProfileDetailsForm = ({
  onSubmit,
  onChange,
  errors,
  profile_details
}) => {
  return (
    <div className='profile-details-form'>
      <Row>
        <Col sm={{ offset: 2, span : 8}} className='col'>
          {errors.message && <p style={{ color: "red", textAlign: 'center' }}>{errors.message}</p>}
          <form onSubmit={onSubmit} style={{marginBottom: '20px'}}>
            <TextField
              name="fullname"
              label="full name"
              value={profile_details.fullname}
              onChange={onChange}
              helperText={errors.fullname}
              fullWidth
              margin='dense'
              error={errors.fullname !== undefined}
            />
            <TextField
              name="description"
              label="description"
              multiline
              rows={4}
              value={profile_details.description}
              onChange={onChange}
              helperText='Please enter a description of you'
              fullWidth
              margin='dense'
              variant="outlined"
            />
            <Button 
              className='button' 
              variant="primary" 
              size="lg" 
              type="submit"
              style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
              > Submit
            </Button>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileDetailsForm;