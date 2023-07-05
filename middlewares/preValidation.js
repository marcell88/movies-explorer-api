const { celebrate, Joi } = require('celebrate');
const { linkRegex, idRegex } = require('../utils/regexPatterns');

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const idParamValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().regex(idRegex),
  }),
});

const userProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.string(),
    description: Joi.string(),
    image: Joi.string().regex(linkRegex),
    trailerLink: Joi.string().regex(linkRegex),
    thumbnail: Joi.string().regex(linkRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  idParamValidation,
  userProfileValidation,
  cardValidation,
};
