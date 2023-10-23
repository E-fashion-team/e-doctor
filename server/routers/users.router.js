const express = require('express');
const { addUser, editUser, getAllUsers } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/getUsers', getAllUsers);

usersRouter.put('/:userId', editUser);
usersRouter.post("/addUser", addUser);

module.exports = usersRouter;
