const express = require('express');
const userRoutes = require('./routes/users');
const foodRoutes = require('./routes/food');
const calculationResultRoutes = require('./routes/calculations');
require('dotenv').config();

const app = express();

app.use(express.json());

const port = parseInt(process.env.EXPRESS_PORT ?? '5000', 10);

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const welcome = (req, res) => {
  res.send('Welcome to food server');
};

const api = (req, res) => {
  res.send('Welcome to food server APIs');
};

app.get('/', welcome);
app.get('/api', api);
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/calculation', calculationResultRoutes);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
