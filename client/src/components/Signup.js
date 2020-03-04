import React, { Component } from "react";
import SignupForm from "./SignupForm";
import axios from 'axios';
import { validateSignupForm } from '../validate';


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
        if (res.data.success === true) {
          //do setting in cookie
          //let details_connexion = { value: "true", timestamp: new Date().getTime() + 1000*10 }
          //localStorage.setItem('isLoggedIn', JSON.stringify(details_connexion))

          //do setting in cookie
          localStorage.setItem('isLoggedIn', 'true')
          
          this.props.history.push('/dashboard')

          //do verification in cookie
          //details_connexion = JSON.parse(localStorage.getItem('isLoggedIn'))
          // if(details_connexion.value){
          //   this.props.history.push('/dashboard')
          // }
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

    this.setState({user});
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
