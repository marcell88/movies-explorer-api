const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signupValidation, signinValidation } = require('../middlewares/preValidation');
const cors = require('../middlewares/cors');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');

router.use(cors);
router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/', (req, res, next) => { next(new DocumentNotFoundError('Page not found')); });

module.exports = router;
