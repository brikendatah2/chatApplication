const FriendList = require('../Models/FriendList');

module.exports = {
    async sendFriendRequest(req, res) {
        try {
            const { userId, friendId } = req.body;

            
            const existingRequest = await FriendList.findOne({ user: userId, friend: friendId });
            if (existingRequest) {
                return res.status(400).json({ error: 'Friend request already exists' });
            }

            
            const newFriendRequest = new FriendList({
                user: userId,
                friend: friendId,
                status: 'pending'
            });

            const savedRequest = await newFriendRequest.save();
            res.status(201).json(savedRequest);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async respondToFriendRequest(req, res) {
        try {
            const { requestId } = req.params;
            const { status } = req.body;

            if (!['accepted', 'rejected'].includes(status)) {
                return res.status(400).json({ error: 'Invalid status' });
            }

            const updatedRequest = await FriendList.findByIdAndUpdate(requestId, { status }, { new: true });
            res.status(200).json(updatedRequest);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getFriendList(req, res) {
        try {
            const { userId } = req.params;
            const friends = await FriendList.find({
                user: userId,
                status: 'accepted'
            }).populate('friend', 'username email');

            res.status(200).json(friends);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
