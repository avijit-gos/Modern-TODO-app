/** @format */

const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, trim: true, require: true },
    description: { type: String, trim: true, require: true },
    catagory: { type: String, default: "all" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    image: { type: String, default: "" },
    link1: { type: String, default: "" },
    link2: { type: String, default: "" },
    link3: { type: String, default: "" },
    pin: { type: Boolean, default: false },
    bookmark: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    shares: [{ type: mongoose.Types.ObjectId, ref: "Notes" }],
    comment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    cmnt_count: { type: Number, default: 0 },
    report: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notes", notesSchema);
