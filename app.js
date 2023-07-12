const express = require('express');
const app = express();
const { Pool } = require('pg');

// ElephantSQL connection configuration
const pool = new Pool({
  user: 'Enter_user_here',
  host: 'Enter_host here',
  database: 'Enter_database_here',
  password: 'Enter_password_here',
  port: 3000, // Default PostgreSQL port
});

// Example route to fetch data from the database
app.get('/data', (req, res) => {
  pool.query('SELECT * FROM your_table', (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Error executing query');
    } else {
      res.json(results.rows);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

