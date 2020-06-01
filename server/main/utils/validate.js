const validator = require('validator');
const passValidator = require('password-validator');

const schema = new passValidator();

//sets 2 password requirements
schema
.is().min(5)
.has().uppercase();

//make validation for data in signup route (username + fullname + email + password)
const validateSignupForm = payload => {
  let isFormValid = true;
  let message = "";
  const errors = {};

  if (typeof payload.username !== "string" || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = "Please provide a user name.";
  }

  if (typeof payload.fullname !== "string" || payload.fullname.trim().length === 0) {
    isFormValid = false;
    errors.fullname = "Please provide a full name.";
  }

  if (typeof payload.email !== "string" || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (typeof payload.password !== "string" || !schema.validate(payload.password.trim())) {
    isFormValid = false;
    console.log('I am here')
    errors.password = "Password must have at least 8 characters and one uppercase";
  }

  if (payload.pwconfirm !== payload.password) {
    isFormValid = false;
    errors.pwconfirm = "Password confirmation doesn't match.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

//make validation for data in signin route (username + password)
const validateSigninForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (typeof payload.username !== "string" || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = "Please provide your user name.";
  }

  if (typeof payload.password !== "string" || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

//make validation for data in profile_details route (fullname + description)
const validateProfileDetailsForm = (payload) => {
  let isFormValid = true;
  let message = "";
  const errors = {};

  if (typeof payload.fullname !== "string" || payload.fullname.trim().length === 0) {
    isFormValid = false;
    errors.fullname = "Please provide a full name.";
  }

  if (typeof payload.description !== "string" || payload.description.trim().length > payload.limit_description) {
    isFormValid = false;
    errors.description = `description must contain ${payload.limit_description} characters maximum.`;
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

module.exports = {
  validateSignupForm,
  validateSigninForm,
  validateProfileDetailsForm
}