import React, { Component } from "react";
import SigninForm from "./SigninForm";
import axios from 'axios';
import { validateSigninForm } from './validate';
import {Redirect} from 'react-router-dom'


class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        password: ""
      }
    };

    this.validateForm = this.validateForm.bind(this);
    this.submitSignin = this.submitSignin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.title = 'Log into Gooder - Gooder'
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSigninForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      var user = {
        usr: this.state.user.username,
        pw: this.state.user.password
      };
      this.submitSignin(user)
      // if(this.submitSignin(user))
      //   this.props.history.push('/dashboard')
    } else {
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  submitSignin(user) {
    var params = { username: user.usr, password: user.pw };
    axios
      .post("/signin", params)
      .then(res => {
        console.log(res.data)
        if (res.data.success === true) {
          //localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          window.location.reload();
          //return true
        } else {
          this.setState({
            errors: res.data.errors
          });
        }
      })
      .catch(err => {
        console.log("Sign in data submit error: ", err);
      });
      //return false
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <div>
          <SigninForm
            onSubmit={this.validateForm}
            onChange={this.handleChange}
            errors={this.state.errors}
            user={this.state.user}
          />
      </div>
    );
  }
}

export default Signin;
