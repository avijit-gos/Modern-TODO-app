/** @format */

const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    isGroup: { type: Boolean, default: false },
    name: { type: String, default: "Single Chat" },
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    bookmark: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Types.ObjectId, ref: "User" },
    mods: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    block: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    privacy: { type: String, default: "all" },
    lastMsg: { type: mongoose.Types.ObjectId, ref: "Message" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Chat", chatSchema);
