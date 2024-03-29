/** @format */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, trim: true },
    username: { type: String, trim: true, unique: true, index: true },
    email: { type: String, trim: true, unique: true, index: true },
    password: { type: String },
    profilePic: { type: String, default: "" },
    flwr: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    flw: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
    cmplt_tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
    profilePrivacy: { type: String, default: "all" },
    postPrivacy: { type: String, default: "all" },
    msgPrivacy: { type: String, default: "all" },
    notes: [{ type: mongoose.Types.ObjectId, ref: "Notes" }],
    group: [{ type: mongoose.Types.ObjectId, ref: "Chat" }],
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
