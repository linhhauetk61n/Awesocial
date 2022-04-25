const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

class MessageController {
    //send a message
    async send(req, res) {
        const newMessage = new Message(req.body);
        const currentConversationId = req.body.conversationId;
        try {
            const savedMessage = await newMessage.save();
            await Conversation.findByIdAndUpdate(currentConversationId, {
                type: false,
            });

            return res
                .status(200)
                .json({ success: true, message: savedMessage });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //get message
    async get(req, res) {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId,
            });
            return res.status(200).json({ success: true, messages });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new MessageController();
