const express = require('express');
const router = express.Router();
const FriendListController = require('../controllers/friendListController');

router.post('/send', FriendListController.sendFriendRequest);
router.patch('/respond/:requestId', FriendListController.respondToFriendRequest);
router.get('/:userId', FriendListController.getFriendList);

module.exports = router;
