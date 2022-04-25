const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommentSchema = new Schema(
    {
        postId: { type: String, required: true },
        userId: { type: String, required: true },
        comment: { type: String },
        likes: { type: Array, default: [] },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Comment", CommentSchema);
