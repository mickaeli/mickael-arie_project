import React, { Component } from 'react';

import axios from 'axios'

import ProfileDetailsForm from './ProfileDetailsForm'
import { validateProfileDetailsForm } from '../validate'

class ProfileDetailsFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      errors: {},
      profile_details: {
        fullname: "",
        description: ""
      }
    };
  }

  componentDidMount() {
    axios.get(`/profile_fullname/${this.state.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState(prevState => {
          let profile_details = Object.assign({}, prevState.profile_details);
          profile_details.fullname = res.data.fullname;             
          return { profile_details };
        })
      }
    })
    .catch(err => {
      console.log("Get data error: ", err);
    });

    axios.get(`/profile_description/${this.state.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState(prevState => {
          let profile_details = Object.assign({}, prevState.profile_details);
          profile_details.description = res.data.description;             
          return { profile_details };
        })
      }
    })
    .catch(err => {
      console.log("Get data error: ", err);
    });

  }

  validateForm = (event) => {
    event.preventDefault();
    let payload = validateProfileDetailsForm(this.state.profile_details);

    if (payload.success) {
      this.setState({
        errors: {}
      });
      let profile_details = {
        fullname: this.state.profile_details.fullname,
        description: this.state.profile_details.description
      };
      this.submitProfileDetails(profile_details)
    } else {
      this.setState({
        errors : payload.errors
      });
    }
  }

  submitProfileDetails = (profile_details) => {
    let params = { fullname: profile_details.fullname, description: profile_details.description };
    axios.put(`/profile_details/${this.state.username}`, params)
    .then(res => {
      if (res.data.success === true) {
        let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
        isLoggedIn.fullname = res.data.fullname
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        window.location.reload();
      } else {
        this.setState({
          errors: res.data.errors
        });
      }
    })
    .catch(err => {
      console.log("Profile details data submit error: ", err);
    });
  }

  handleChange = (event) => {
    const field = event.target.name;
    const profile_details = this.state.profile_details;
    profile_details[field] = event.target.value;

    this.setState({profile_details});
  }

  render() {
    return (
      <div>
        <ProfileDetailsForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          errors={this.state.errors}
          profile_details={this.state.profile_details}
        />
      </div>
    );
  }
}

export default ProfileDetailsFormContainer;