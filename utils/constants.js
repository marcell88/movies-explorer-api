const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const {
  NODE_ENV = 'development',
  PORT = 3000,
  JWT_SECRET = 'super-secret',
  DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  DB,
};
