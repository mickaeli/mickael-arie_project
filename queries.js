const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'mickael',
  host: 'localhost',
  database: 'api',
  password: 'mickael_israel',
  port: 5432
});


const createUser = function(req, res) {
	
	const { name, password } = req.body;
	
	pool.query('SELECT * FROM users WHERE name = $1', [name], function(error, results) {
		if (error) {
		  throw error;
		}
		else if(results) {
			res.status(404).send('This user name yet in use!');
		}
		else {
			pool.query('INSERT INTO users (name, password) VALUES ($1, $2)', [name, password], function(error, results) {
			if (error) {
			  throw error
			}
			res.status(201).send(`User added with ID: ${results.insertId}`);
			
			});
		}
	});
};


module.exports = {
  createUser
};