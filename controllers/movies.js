const mongoose = require('mongoose');
const http2 = require('node:http2');

const Movie = require('../models/movies');

const BadRequestError = require('../errors/BadRequestError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const UnhandledError = require('../errors/UnhandledErrod');
const ForbiddenError = require('../errors/ForbiddenError');

const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = http2.constants;

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
    .catch(() => {
      next(new UnhandledError('Server has broken while trying to get all cards'));
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => { throw new mongoose.Error.DocumentNotFoundError(); })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return Movie.findByIdAndDelete(req.params.id)
        .then(() => {
          res.status(HTTP_STATUS_OK).send({ message: 'Deleted successfully' });
        });
    })
    .catch((err) => {
      if (err instanceof ForbiddenError) {
        next(new ForbiddenError('Access denied, this is not your card'));
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new DocumentNotFoundError('Card with such id has not found'));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Please enter correct card id'));
        return;
      }
      next(new UnhandledError('Server has broken while trying to delete the card'));
    });
};

const createMovie = (req, res, next) => {
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    owner: req.user._id,
  })
    .then((movie) => Movie.findById(movie._id)
      .populate(['owner'])
      .then((moviePopulated) => res.status(HTTP_STATUS_CREATED).send(moviePopulated)))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Incorrect data were send to server for card creation'));
        return;
      }
      next(new UnhandledError('Server has broken while trying to create new card'));
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
