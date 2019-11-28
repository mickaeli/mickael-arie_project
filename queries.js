const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'mickael',
  host: 'localhost',
  database: 'api',
  password: 'mickael_israel',
  port: 5432
});

const getUsers = function(req, res) {
  pool.query('SELECT * FROM users ORDER BY id ASC', function(error, results) {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = function(req, res) {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], function(error, results) {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createUser = function(req, res) {
  const { name, email } = req.body;

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], function(error, results) {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results.insertId}`);
  });
}

const updateUser = function(req, res) {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    function(error, results) {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = function(req, res) {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], function(error, results) {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};













