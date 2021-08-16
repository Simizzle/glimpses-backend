
const { Router } = require('express');
const userRouter = Router();
const {createUser, findUser, deleteUser, updateUser}= require('./users.controllers');

userRouter.post('/users', createUser);
userRouter.get('/users/:username', findUser);
userRouter.delete('/users/:username', deleteUser);
userRouter.put('/users/:username', updateUser);

module.exports = userRouter;