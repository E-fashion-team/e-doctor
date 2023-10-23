const express = require('express');
const {
  getAllConversations,
  newConversation,
  readConversation,
} = require('../controllers/room.controller');

const conversationsRouter = express.Router();

conversationsRouter.post('/new', newConversation);

conversationsRouter.get('/:userId', getAllConversations);

conversationsRouter.put('/:conversationId/read', readConversation);

module.exports = conversationsRouter;
