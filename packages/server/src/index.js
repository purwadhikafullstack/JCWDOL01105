require('dotenv/config');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { join } = require('path');
const router = require('./routes');

const PORT = process.env.CUSTOM_PORT;
const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use('/api', router);

app.get('/api', (req, res) => {
  res.send(`Hello, this is my API`);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
