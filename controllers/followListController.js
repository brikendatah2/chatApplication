const FollowList = require('../Models/FollowList');

module.exports = {
    async followUser(req, res) {
        try {
            const { user, following } = req.body;

            const existingFollow = await FollowList.findOne({ user, following });
            if (existingFollow) {
                return res.status(400).json({ error: 'Already following this user' });
            }

            const newFollow = new FollowList({ user, following });
            const savedFollow = await newFollow.save();

            res.status(201).json(savedFollow);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getFollowings(req, res) {
        try {
            const { userId } = req.params;
            const followings = await FollowList.find({ user: userId })
                .populate('following', 'username email');

            res.status(200).json(followings);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async unfollowUser(req, res) {
        try {
            const { userId, followId } = req.params;
            await FollowList.findOneAndDelete({ user: userId, following: followId });
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};