'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFoundHndler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const clothesRouter = require('./routes/clothes.js');
const foodRouter = require('./routes/food.js');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1/clothes/', clothesRouter);
app.use('/api/v1/food/', foodRouter);
app.use('*', notFoundHndler);
app.use(errorHandler);


module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 6000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};




