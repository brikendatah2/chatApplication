const Notification = require('../Models/Notification');

module.exports = {
  async createNotification(req, res) {
    try {
      const notification = await Notification.create(req.body);
      res.status(201).json(notification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getAllNotifications(req, res) {
    try {
      const notifications = await Notification.find();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getNotificationsByUser(req, res) {
    try {
      const userId = req.params.userId;
      const notifications = await Notification.find({ recipient: userId });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async markNotificationAsRead(req, res) {
    try {
      const notificationId = req.params.id;
      const updatedNotification = await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
      res.status(200).json(updatedNotification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async deleteNotification(req, res) {
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
