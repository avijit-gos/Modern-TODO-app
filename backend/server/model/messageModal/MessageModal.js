/** @format */

const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    content: { type: String },
    image: { type: String, default: "" },
    chatId: { type: mongoose.Types.ObjectId, ref: "Chat" },
    like: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    bookmark: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", messageSchema);
