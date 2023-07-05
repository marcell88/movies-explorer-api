const mongoose = require('mongoose');
const { isURL } = require('validator');

// Снизил максимально требования к внешней БД - по факту необходим только ID,
// Остальные поля (в крайнем случае) подгрузятся как дефолтные значения

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    default: 'Нет данных',
  },
  director: {
    type: String,
    required: true,
    default: 'Нет данных',
  },
  duration: {
    type: Number,
    required: true,
    default: 90, // средняя продолжительность фильма, если поле не задаано
  },
  year: {
    type: String,
    required: true,
    default: 'Нет данных',
  },
  description: {
    type: String,
    required: true,
    default: 'Нет данных',
  },
  image: {
    type: String,
    required: true,
    default: 'https://themovies.nomoreparties.sbs/no-link',
    validate: {
      validator(link) {
        return isURL(link);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    default: 'https://themovies.nomoreparties.sbs/no-link',
    validate: {
      validator(link) {
        return isURL(link);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    default: 'https://themovies.nomoreparties.sbs/no-link',
    validate: {
      validator(link) {
        return isURL(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    default: 'Нет данных',
  },
  nameEN: {
    type: String,
    required: true,
    default: 'Нет данных',
  },
});

module.exports = mongoose.model('movie', movieSchema);
