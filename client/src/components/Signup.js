import React, { Component } from "react";
import SignupForm from "./SignupForm";
import axios from 'axios';
import { validateSignupForm } from './validate';


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        email: "",
        password: "",
        pwconfirm: ""
      }
    };

    this.validateForm = this.validateForm.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.title = 'Sign up - Gooder'
  }

  validateForm(event) {
    event.preventDefault();
    let payload = validateSignupForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      let user = {
        usr: this.state.user.username,
        email: this.state.user.email,
        pw: this.state.user.password,
        pwconfirm: this.state.user.pwconfirm
      };
      this.submitSignup(user)
      if(localStorage.isAuthenticated){
        this.props.history.push('/dashboard')
      }
    } else {
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  submitSignup(user) {
    let params = { username: user.usr, email: user.email, password: user.pw, pwconfirm: user.pwconfirm };
    axios.post("/signup", params)
      .then(res => {
        console.log(res.data)
        if (res.data.success === true) {
          //localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          //window.location.reload();
        } else {
          this.setState({
            errors: res.data.errors
          });
        }
      })
      .catch(err => {
        console.log("Sign up data submit error: ", err);
      });
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
          <SignupForm
            onSubmit={this.validateForm}
            onChange={this.handleChange}
            errors={this.state.errors}
            user={this.state.user}
          />
      </div>
    );
  }
}

export default Signup;
