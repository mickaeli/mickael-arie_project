const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'mickael',
  host: 'localhost',
  database: 'api',
  password: 'mickael_israel',
  port: 5432
});

const validator = require('./validator');


const createUser = function(req, res) {
	
	const { name, password } = req.body;
	
	if(!validator.checkValidation(res, name, password))
		return;
	
	pool.query('SELECT * FROM users WHERE name = $1', [name], function(error, results) {
		
		if (error) {
			
		  throw error;
		  
		} if(results.rowCount != 0) {
			
			res.status(404).send('This user name yet in use!');
			
		} else {
			
			pool.query('INSERT INTO users (name, password) VALUES ($1, $2)', [name, password], function(error, results) {
			if (error) {
			  throw error;
			}
			
			//res.redirect(307, '/login');
			//res.status(201).send(`User added`);
			
			});
			
		}
	});
};

const loginUser = function(req, res) {
	
	const { name, password } = req.body;
			
	pool.query('SELECT FROM users WHERE name = $1', [name], function(error, results) {
		
		if (error) {
			
		  throw error;
		  
		} if(results.rowCount == 0) {
				
			res.status(404).send('You are not registered in the database!');
		
		} else if(password != results.rows[0].password) {
			
			res.status(404).send('Your password is wrong!');
			
		} else {
			
			//open session
			
		}
			
	});
}

module.exports = {
  createUser,
  loginUser
};