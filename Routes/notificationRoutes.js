const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');


router.post('/', NotificationController.createNotification);
router.get('/', NotificationController.getAllNotifications);
router.get('/:userId', NotificationController.getNotificationsByUser);
router.put('/:id', NotificationController.markNotificationAsRead);
router.delete('/:id', NotificationController.deleteNotification);

module.exports = router;
