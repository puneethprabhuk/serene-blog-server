const { createUser, signin } = require('../controllers/userController');

const userRouter = require('express').Router();

userRouter.post('/signup', createUser);
userRouter.post('/signin', signin);

module.exports = userRouter;