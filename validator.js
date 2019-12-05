const passValidator = require('password-validator');
var emailvalidator = require("email-validator");

const schema = new passValidator();

schema
.is().min(5)
.has().uppercase();

const checkValidation = function(username, email, password) {
	
	//return (username && emailvalidator.validate(email) && schema.validate(password));
	if(!username)
	{
		console.log('user_name is empty!');
		return false;
	}
		
	if(!emailvalidator.validate(email))
	{
		console.log('email don\'t suit the restrictions!');
		return false;
	}
	
	if(!schema.validate(password))
	{
		console.log('password don\'t suit the restrictions!');
		return false;
	}
	
	return true;
	
};

module.exports = {
  checkValidation
};