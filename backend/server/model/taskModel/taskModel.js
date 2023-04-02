/** @format */

const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    priority: { type: String, trim: true, default: "High" },
    type: { type: String, trim: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    status: { type: String, default: "active" },
    pinn: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
