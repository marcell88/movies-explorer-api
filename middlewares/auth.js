const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnautorizedError');

const { JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('No token. Access denied. Authorization is needed'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Token is incorrect. Access denied. Authorization is needed'));
    return;
  }

  req.user = payload;
  next();
};
