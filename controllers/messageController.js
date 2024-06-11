const Message = require('../Models/Message');

module.exports = {
  async createMessage(req, res) {
    try {
      const message = await Message.create(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getAllMessages(req, res) {
    try {
      const messages = await Message.find();
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getMessageById(req, res) {
    try {
      const message = await Message.findById(req.params.id);
      res.status(200).json(message);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async updateMessage(req, res) {
    try {
      const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(message);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async deleteMessage(req, res) {
    try {
      await Message.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
