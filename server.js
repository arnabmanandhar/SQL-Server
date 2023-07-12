const express = require('express');
const app = express();
const { Client } = require('pg');
const bodyParser = require('body-parser');

const connectionString = 'Enter_ElephantSQL_URL';
const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


app.use(bodyParser.json());

// Serve the static files
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const { dataInput } = req.body;

  const query = 'INSERT INTO tbl_data (data) VALUES ($1)';
  const values = [dataInput];

  client.query(query, values, (err) => {
    if (err) 
    {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } 
    else 
    {
      res.sendStatus(200);
    }
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});