const validator = require('validator');
const passValidator = require('password-validator');

const schema = new passValidator();

schema
.is().min(5)
.has().uppercase();

const validateSignupForm = payload => {
  let isFormValid = true;
  let message = "";
  const errors = {};

  if (
    typeof payload.username !== "string" ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = "Please provide a user name.";
  }

  if (
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    typeof payload.password !== "string" ||
    !schema.validate(payload.password.trim())
    //payload.password.trim().length < 8
  ) {
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

const validateSigninForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (
    typeof payload.username !== "string" ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = "Please provide your user name.";
  }

  if (
    typeof payload.password !== "string" ||
    payload.password.trim().length === 0
  ) {
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

module.exports = {
  validateSignupForm,
  validateSigninForm
}