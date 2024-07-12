const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/user-activity', reportController.getUserActivityReport);
router.get('/message-activity', reportController.getMessageActivityReport);
router.get('/group-activity', reportController.getGroupActivityReport);
router.get('/notifications', reportController.getNotificationReport);
router.get('/friend-follow', reportController.getFriendAndFollowReport);

module.exports = router;