import validator from 'validator';

const passValidator = require('password-validator');

const schema = new passValidator();

//sets 2 password requirements
schema
.is().min(5)
.has().uppercase();

//make validation for data in signup form (username + fullname + email + password)
export const validateSignupForm = payload => {
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
    typeof payload.fullname !== "string" ||
    payload.fullname.trim().length === 0
  ) {
    isFormValid = false;
    errors.fullname = "Please provide a full name.";
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
  ) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters and one uppercase.";
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

//make validation for data in signin form (username + password)
export const validateSigninForm = payload => {
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

//make validation for data in profileDetails form (fullname + description)
export const validateProfileDetailsForm = payload => {
  let isFormValid = true;
  let message = "";
  const errors = {};

  if (
    typeof payload.fullname !== "string" ||
    payload.fullname.trim().length === 0
  ) {
    isFormValid = false;
    errors.fullname = "Please provide a full name.";
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