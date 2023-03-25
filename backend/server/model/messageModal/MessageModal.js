/** @format */

const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    content: { type: String },
    image: { type: String, default: "" },
    chatId: { type: mongoose.Types.ObjectId, ref: "Chat" },
    like: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    save: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("message", messageSchema);
