const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/conversationController');

router.post('/', ConversationController.createConversation);
router.get('/:userId', ConversationController.getConversations);
router.post('/:conversationId/messages', ConversationController.addMessage);

module.exports = router;  
