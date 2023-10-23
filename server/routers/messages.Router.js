const express = require('express');
const {
  deleteMessage,
  editMessage,
  getMessagesInConversation,
  newMessage,
} = require('../controllers/message.controller');

const messagesRouter = express.Router();

messagesRouter.post('/new', newMessage);
messagesRouter.get('/getMessages', getMessagesInConversation);
messagesRouter.route('/:id').delete(deleteMessage).put(editMessage);
module.exports = messagesRouter;
