/** @format */

const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    comment: { type: String, trim: true },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    postId: { type: mongoose.Types.ObjectId, ref: "Notes", index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
