const userRouter = require('express').Router();
const userControllers = require('../controllers/users');
const { userProfileValidation } = require('../middlewares/preValidation');

userRouter.get('/me', userControllers.getCurrentUser);
userRouter.patch('/me', userProfileValidation, userControllers.updateProfile);

module.exports = userRouter;
