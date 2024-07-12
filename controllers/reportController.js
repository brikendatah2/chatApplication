const User = require('../Models/User');
const Message = require('../Models/Message');
const Group = require('../Models/Group');
const Notification = require('../Models/Notification');
const FriendList = require('../Models/FriendList');
const FollowList = require('../Models/FollowList');

module.exports = {
    async getUserActivityReport(req, res) {
        try {
            const totalUsers = await User.countDocuments();
            const newUsers = await User.countDocuments({
                createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
            });
            const messages = await Message.aggregate([
                { $group: { _id: "$msgByUserId", count: { $sum: 1 } } },
            ]);

            const mostActiveUsers = messages.sort((a, b) => b.count - a.count).slice(0, 5);

            res.status(200).json({
                totalUsers,
                newUsers,
                mostActiveUsers,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getMessageActivityReport(req, res) {
        try {
            const totalMessages = await Message.countDocuments();
            const messagesPerDay = await Message.aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                        },
                        count: { $sum: 1 },
                    },
                },
            ]);
            const averageMessagesPerUser = await Message.aggregate([
                {
                    $group: {
                        _id: "$msgByUserId",
                        count: { $sum: 1 },
                    },
                },
                {
                    $group: {
                        _id: null,
                        avgCount: { $avg: "$count" },
                    },
                },
            ]);

            res.status(200).json({
                totalMessages,
                messagesPerDay,
                averageMessagesPerUser: averageMessagesPerUser[0].avgCount,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getGroupActivityReport(req, res) {
        try {
            const totalGroups = await Group.countDocuments();
            const newGroups = await Group.countDocuments({
                createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
            });
            const groupMessages = await Message.aggregate([
                { $group: { _id: "$conversationId", count: { $sum: 1 } } },
            ]);

            const mostActiveGroups = groupMessages.sort((a, b) => b.count - a.count).slice(0, 5);

            res.status(200).json({
                totalGroups,
                newGroups,
                mostActiveGroups,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getNotificationReport(req, res) {
        try {
            const totalNotifications = await Notification.countDocuments();
            const readNotifications = await Notification.countDocuments({ read: true });
            const unreadNotifications = totalNotifications - readNotifications;

            res.status(200).json({
                totalNotifications,
                readNotifications,
                unreadNotifications,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getFriendAndFollowReport(req, res) {
        try {
            const totalFriendRequests = await FriendList.countDocuments();
            const acceptedRequests = await FriendList.countDocuments({ status: 'accepted' });
            const rejectedRequests = await FriendList.countDocuments({ status: 'rejected' });
            const totalFollows = await FollowList.countDocuments();

            res.status(200).json({
                totalFriendRequests,
                acceptedRequests,
                rejectedRequests,
                totalFollows,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
