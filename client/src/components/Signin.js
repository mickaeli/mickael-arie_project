import React, { Component } from "react";
import SigninForm from "./SigninForm";
import axios from 'axios';
import { validateSigninForm } from '../validate';


class Signin extends Component {
  constructor(props) {
    super(props);

    this.signal = axios.CancelToken.source();

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

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled in Signin');
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
      this.setState({
        errors : payload.errors
      });
    }
  }

  submitSignin(user) {
    let params = { username: user.usr, password: user.pw };
    axios.post("/signin", params, {
      cancelToken: this.signal.token
    })
    .then(res => {
      if (res.data.success === true) {
        axios.get(`/profile_details/${user.usr}`, {
          cancelToken: this.signal.token
        })
        .then(res => {
          if(res.data.success === true) {
            //do setting in cookie
            let details_connexion = { value: true, username: user.usr, fullname: res.data.userDetails.fullname, profilePicture: res.data.userDetails.profilePicture, timestamp: new Date().getTime() }
            localStorage.setItem('isLoggedIn', JSON.stringify(details_connexion))
            let event = new Event('storage')
            event.key = 'isLoggedIn'
            event.value = JSON.stringify(details_connexion)
            window.dispatchEvent(event);
          }
        })
        .catch(err => {
          if(axios.isCancel(err)) {
            console.log('Error: ', err.message); // => prints: Api is being canceled in Signin
          } else {
            console.log("get data error: ", err);
          }
          
        });

      } else {
        this.setState({
          errors: res.data.errors
        });
      }
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled in Signin
      } else {
        console.log("Sign in data submit error: ", err);
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
