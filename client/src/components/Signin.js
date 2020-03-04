import React, { Component } from "react";
import SigninForm from "./SigninForm";
import axios from 'axios';
import { validateSigninForm } from '../validate';


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
    document.title = 'Login - Gooder'
  }

  validateForm(event) {
    event.preventDefault();
    let payload = validateSigninForm(this.state.user);

    if (payload.success) {
      this.setState({
        errors: {}
      });
      let user = {
        usr: this.state.user.username,
        pw: this.state.user.password
      };
      this.submitSignin(user)
    } else {
      const errors = payload.errors;
      this.setState({errors});
    }
  }

  submitSignin(user) {
    let params = { username: user.usr, password: user.pw };
    axios
      .post("/signin", params)
      .then(res => {
        if (res.data.success === true) {
          //do setting in cookie
          //let details_connexion = { value: "true", timestamp: new Date().getTime() + 1000*10 }
          //localStorage.setItem('isLoggedIn', JSON.stringify(details_connexion))

          //do setting in cookie
          localStorage.setItem('isLoggedIn', true)
          //localStorage.setItem('login-event', 'login ' + new Date().getTime());
          //localStorage.setItem('user', JSON.stringify(params.username))

          //this.props.history.push('/dashboard')

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
        console.log("Sign in data submit error: ", err);
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
