const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const settings = require('./config/Settings')
const api = require('./routes/Api')
const resHandler = require('./utils/ResHandler')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api)
app.use(resHandler.susscess)
app.use(resHandler.error)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;