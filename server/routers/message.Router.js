const express = require("express");
const { addMessage } = require("../controllers/message.controller");

const messageRouter = express.Router();



messageRouter.post('/add', addMessage)
















module.exports = messageRouter;