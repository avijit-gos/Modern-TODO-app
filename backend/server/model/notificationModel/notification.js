/** @format */

const mongoose = require("mongoose");
const notificationSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Types.ObjectId, ref: "User" },
    noteId: { type: mongoose.Types.ObjectId, ref: "Notes" },
    Notitype: { type: String },
    view: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
