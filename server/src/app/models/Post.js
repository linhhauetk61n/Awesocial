const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema(
    {
        userId: { type: String, required: true },
        description: { type: String },
        img: { type: String },
        likes: { type: Array, default: [] },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
