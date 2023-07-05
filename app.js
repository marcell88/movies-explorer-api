const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');

const router = require('./routes/index');
const { PORT, NODE_ENV, DB } = require('./utils/constants');

const app = express();

mongoose.connect(DB)
  .then(() => {
    console.log('Connecteed to DB...');
  })
  .catch((err) => { console.log('Error with DB connection: ', err); });

// Packages
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(express.json());

// Main routes
app.use('/', router);

// Error handlers
app.use(errorLogger);
app.use(errors());
app.use(defaultErrorHandler);

// Server connection
app.listen(PORT, () => { console.log(`Server is ON in ${NODE_ENV} mode on PORT ${PORT}...`); });
