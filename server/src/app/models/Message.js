const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MessageSchema = new Schema(
    {
        conversationId: { type: String },
        sender: { type: String },
        messageText: { type: String },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Message", MessageSchema);
