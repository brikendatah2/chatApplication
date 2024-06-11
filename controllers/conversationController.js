const Conversation = require('../Models/Conversation');
const Message = require('../Models/Message');

module.exports = {
    async createConversation(req, res) {
        try {
            const { participants, messages } = req.body;

            if (participants.length < 2) {
                return res.status(400).json({ error: 'A conversation must have at least two participants' });
            }

            const newConversation = new Conversation({
                participants,
                messages: messages || []
            });

            const savedConversation = await newConversation.save();
            res.status(201).json(savedConversation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getConversations(req, res) {
        try {
            const { userId } = req.params;
            const conversations = await Conversation.find({
                participants: userId
            }).populate('participants', 'username email').populate('messages');
            res.status(200).json(conversations);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async addMessage(req, res) {
        try {
            const { conversationId } = req.params;
            const { text, file, seen, msgByUserId, msgReciever } = req.body;

            const newMessage = new Message({
                text,
                file,
                seen,
                msgByUserId,
                msgReciever
            });

            const savedMessage = await newMessage.save();

            const updatedConversation = await Conversation.findByIdAndUpdate(
                conversationId,
                { $push: { messages: savedMessage._id } },
                { new: true }
            ).populate('messages');

            res.status(200).json(updatedConversation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
