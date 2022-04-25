const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ConversationSchema = new Schema(
    {
        members: { type: Array },
        name: { type: String },
        type: { type: Boolean, default: 0 },
        img: { type: String },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
