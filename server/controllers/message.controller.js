var db = require("../prisma/prisma");

exports.newMessage = async (req, res) => {
  const { message, conversationId } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ message: "Must provide a message" });
  }

  if (!conversationId) {
    return res.status(400).json({ message: "Must provide a conversationId" });
  }

  const authorId = req.userId;
  const parsedAuthorId = parseInt(authorId);
  const parsedConversationId = parseInt(conversationId);

  try {
    const newMessage = await db.message.create({
      data: {
        message,
        authorId: parsedAuthorId,
        conversationId: parsedConversationId,
      },
      include: {
        conversation: {
          include: {
            participants: true,
          },
        },
      },
    });

    const conversation = newMessage.conversation;
    if (conversation) {
      await db.conversation.update({
        where: { id: conversation.id },
        data: { dateLastMessage: new Date() },
      });
    }

    conversation?.participants
      .filter((participant) => participant.userId !== parsedAuthorId)
      .forEach(async (participant) => {
        await db.conversationUser.updateMany({
          where: {
            conversationId: parsedConversationId,
            userId: participant.userId,
          },
          data: { isRead: false },
        });
      });

    const response = {
      id: newMessage.id,
      message: newMessage.message,
      authorId: newMessage.authorId,
      created_at: newMessage.created_at,
    };
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports.addMessage = async (req, res) => {
  try {
    const response = await db.messages.create({ data: req.body });
    res.json(response);
  } catch (error) {
    throw error;
  }
};
exports.getMessagesInConversation = async (req, res) => {
  const { conversationId, page = 1, limit = 10 } = req.query;

  if (!conversationId) {
    return res.status(400).json({ message: "Must provide a conversationId" });
  }

  const currentUserId = req.userId;
  const parsedCurrentUserId = parseInt(currentUserId);
  const parsedConversationId = parseInt(conversationId);
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  try {
    const conversation = await db.conversation.findUnique({
      where: { id: parsedConversationId },
      include: { participants: true },
    });
    
    if (
      conversation &&
      conversation.participants.some(participant => participant.userId === parsedCurrentUserId)
    ) {
      await db.conversationUser.updateMany({
        where: {
          conversationId: parsedConversationId,
          userId: parsedCurrentUserId,
        },
        data: { isRead: true },
      });

      let messages;
      if (page) {
        messages = await db.message.findMany({
          where: {
            conversationId: parsedConversationId,
          },
          orderBy: { created_at: "desc" },
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
        });
      } else {
        messages = await db.message.findMany({
          where: {
            conversationId: parsedConversationId,
          },
          orderBy: { created_at: "desc" },
        });
      }
      res.status(200).json(messages);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const message = await db.message.findUnique({
      where: { id },
    });

    if (message && message.authorId === parseInt(req.userId)) {
      await db.message.delete({
        where: { id },
      });

      res.status(200).json({ message: "Message deleted successfully", messageId: id });
    } else {
      res.status(403).json({ message: "You can only delete your own messages" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.editMessage = async (req, res) => {
  const { message: newMessageBody } = req.body;
  const id = parseInt(req.params.id);

  if (!newMessageBody || newMessageBody.trim() === "") {
    return res.status(400).json({ message: "Must provide a message" });
  }

  try {
    const message = await db.message.findUnique({
      where: { id },
    });

    if (message && message.authorId === parseInt(req.userId)) {
      const updatedMessage = await db.message.update({
        where: {
          id,
        },
        data: {
          message: newMessageBody,
          isEdited: true,
        },
      });

      res.status(200).json({ updatedMessage });
    } else {
      res.status(403).json({ message: "You can only edit your own messages" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
