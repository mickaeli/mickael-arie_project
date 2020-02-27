import React, { Component } from "react";
import SigninForm from "./SigninForm";
import axios from 'axios';
import { validateSigninForm } from '../validate';

//redux
import { connect } from 'react-redux'
import { userLogin } from '../actions/auth_action'


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
    //this.updateLoginState = this.updateLoginState.bind(this);
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
          //this.props.userLogin(true)
          this.props.userLogin(true)
          //do verification in cookie
          if(this.props.isLoggedIn){
            this.props.history.push('/dashboard')
          }
          //window.location.reload();
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

  // updateLoginState(){
  //   this.props.userLogin(true)
  //   return true
  // }

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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: isLoggedIn => {
      dispatch(userLogin(isLoggedIn))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Signin);
