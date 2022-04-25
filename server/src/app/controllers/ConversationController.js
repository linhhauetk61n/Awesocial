const Conversation = require("../models/Conversation");

class ConversationController {
    //create a conversation
    async create(req, res) {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });
        try {
            const savedConversation = await newConversation.save();
            return res.status(200).json({
                success: true,
                conversation: savedConversation,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //get conversation of a user
    async get(req, res) {
        try {
            const conversations = await Conversation.find({
                members: { $in: [req.userId] },
            });
            return res.status(200).json({
                success: true,
                conversations,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //create a group conversation
    async createGroup(req, res) {
        const newConversation = new Conversation({
            name: req.body.name,
            type: 1,
            members: [req.body.sendId],
        });
        try {
            const savedConversation = await newConversation.save();
            return res.status(200).json({
                success: true,
                conversation: savedConversation,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //add member of Group
    async addMember(req, res) {
        try {
            const conversation = await Conversation.findById(
                req.params.groupId
            );
            if (!conversation.members.includes(req.body.memberId)) {
                await conversation.updateOne({
                    $push: { members: req.body.memberId },
                });
                return res.status(200).json({
                    success: true,
                    message: "This user has been added in group",
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "This user is in group",
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //get conversation of 2 userId
    async getConversation(req, res) {
        try {
            const conversation = await Conversation.findOne({
                members: {
                    $all: [req.params.firstUserId, req.params.secondUserId],
                },
            });
            return res.status(200).json({ success: true, conversation });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new ConversationController();
