const express = require('express');
const { editUser, getAllUsers } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.put('/:userId', editUser);
module.exports = usersRouter;
