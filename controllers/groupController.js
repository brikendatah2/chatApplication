const Group = require('../Models/Group');

module.exports = {
  async createGroup(req, res) {
    try {
      const group = await Group.create(req.body);
      res.status(201).json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getAllGroups(req, res) {
    try {
      const groups = await Group.find();
      res.status(200).json(groups);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getGroupById(req, res) {
    try {
      const group = await Group.findById(req.params.id);
      res.status(200).json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async updateGroup(req, res) {
    try {
      const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async deleteGroup(req, res) {
    try {
      await Group.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
