const { NODE_ENV } = require('../utils/constants');

const whiteList = [
  'http://themovies.nomoreparties.sbs',
  'htts://themovies.nomoreparties.sbs',
  'http://api.themovies.nomoreparties.sbs',
  'htts://api.themovies.nomoreparties.sbs',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (whiteList.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', '*');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
