import React, { Component, Fragment } from 'react';

import axios from 'axios'

import ProfileDetailsForm from './ProfileDetailsForm'
import { validateProfileDetailsForm } from '../validate'

import { AccountContext } from '../Context'

class ProfileDetailsFormContainer extends Component {
  constructor(props) {
    super(props);

    this.signal = axios.CancelToken.source();

    this.state = {
      errors: {},
      profile_details: {
        username: JSON.parse(localStorage.getItem('isLoggedIn')).username,
        fullname: JSON.parse(localStorage.getItem('isLoggedIn')).fullname,
        description: ""
      },

    };
  }

  componentDidMount() {

    axios.get(`/profile_details/${this.state.profile_details.username}`, {
      cancelToken: this.signal.token
    })
    .then(res => {
      if(res.data.success === true) {
        this.setState(prevState => {
          let profile_details = Object.assign({}, prevState.profile_details);
          profile_details.description = res.data.userDetails.description;             
          return { profile_details };
        })
      }
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled in ProfileDetailsFormContainer
      } else {
        console.log("Get data error: ", err);
      }
      
    });

  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled in ProfileDetailsFormContainer');
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

    const limit_description = 255

    let params = { fullname: profile_details.fullname, description: profile_details.description, limit_description: limit_description };
    axios.put(`/profile_details/${this.state.profile_details.username}`, params, {
      cancelToken: this.signal.token
    })
    .then(res => {
      if (res.data.success === true) {

        this.context.socket.emit('userDetailsModified', { user: this.state.profile_details.username, fullname: res.data.fullname, description: res.data.description } )

        //window.location.reload();
      } else {
        this.setState({
          errors: res.data.errors
        });
      }
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled in ProfileDetailsFormContainer
      } else {
        console.log("Profile details data submit error: ", err);
      }
      
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
      <Fragment>
        <ProfileDetailsForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          errors={this.state.errors}
          profile_details={this.state.profile_details}
          limit_description={255}
        />
      </Fragment>
    );
  }
}

ProfileDetailsFormContainer.contextType = AccountContext;

export default ProfileDetailsFormContainer;