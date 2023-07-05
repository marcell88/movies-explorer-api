const movieRouter = require('express').Router();
const movieControllers = require('../controllers/movies');
const { idParamValidation, cardValidation } = require('../middlewares/preValidation');

movieRouter.get('/', movieControllers.getMovies);
movieRouter.post('/', cardValidation, movieControllers.createMovie);
movieRouter.delete('/:id', idParamValidation, movieControllers.deleteMovieById);

module.exports = movieRouter;
