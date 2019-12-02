const passValidator = require('password-validator');

const schema = new passValidator();

schema
.is().min(5)
.has().uppercase();

const checkValidation = function(res, name, password) {
	if(!name)
	{
		res.status(404).send('user_name is empty!');
		return false;
	}
		
	if(!schema.validate(password))
	{
		res.status(404).send('password don\'t suit the restrictions!');
		return false;
	}
	
	return true;
};

module.exports = {
  checkValidation
};