const express = require('express');

const userRouter = express.Router();

const { errors } = require('celebrate');

const {
  getUsers, getUser, updateUser, updateAvatar, getUserInfo, signOut,
} = require('../controllers/users');

const {
  validateUserId, validateUserUpdate, validateAvatarUpdate,
} = require('../middlewares/validation');

userRouter.get('/', getUsers);

userRouter.get('/me', getUserInfo);

userRouter.get('/:userId', validateUserId, getUser);

userRouter.patch('/me', validateUserUpdate, updateUser);

userRouter.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

userRouter.delete('/me', signOut);

userRouter.use(errors());

module.exports = userRouter;
