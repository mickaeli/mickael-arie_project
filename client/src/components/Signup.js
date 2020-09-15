import React, { Component } from "react";
import SignupForm from "./SignupForm";
import axios from 'axios';
import { validateSignupForm } from '../validate';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.signal = axios.CancelToken.source();

    this.state = {
      errors: {},
      user: {
        username: "",
        fullname: "",
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

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled in Signup');
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
        name: this.state.user.fullname,
        email: this.state.user.email,
        pw: this.state.user.password,
        pwconfirm: this.state.user.pwconfirm
      };
      this.submitSignup(user)

    } else {
      this.setState({
        errors : payload.errors
      });
    }

  }

  submitSignup(user) {
    let params = { username: user.usr, fullname: user.name, email: user.email, password: user.pw, pwconfirm: user.pwconfirm };
    axios.post("/signup", params, {
      cancelToken: this.signal.token
    })
    .then(res => {
      if (res.data.success === true) {

        //do setting in cookie
        let details_connexion = { value: true, newUser: true, username: user.usr, fullname: user.name, profilePicture: 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png', timestamp: new Date().getTime() }
        localStorage.setItem('isLoggedIn', JSON.stringify(details_connexion))
        let event = new Event('storage')
        event.key = 'isLoggedIn'
        event.value = JSON.stringify(details_connexion)
        window.dispatchEvent(event);
      } else {
        this.setState({
          errors: res.data.errors
        });
      }
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled in Signup
      } else {
        console.log("Sign up data submit error: ", err);
      }
      
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
      <div className='signup-form'>
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
