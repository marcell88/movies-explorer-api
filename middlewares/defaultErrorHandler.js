module.exports = ((err, req, res, next) => {
  console.log('Attention! Default error handler has activated...');
  console.log(err.message);
  res.status(err.statusCode).send({
    message: err.message,
    stack: err.stack,
  });
});
