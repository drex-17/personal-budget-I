const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const router = require('./envelopes.routes');

const app = express();
const PORT = process.env['PORT'] || 3000;
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use('/envelopes', router);

app.get('/', (req, res, next) => {
  res.send('Hello, World');
});


app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});