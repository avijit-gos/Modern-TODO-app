/** @format */

const mongoose = require("mongoose");
const User = require("../../model/userModel/userSchema");
const Task = require("../../model/taskModel/taskModel");

class TaskQuery {
  constructor() {
    // console.log("Task query init!!");
  }
  async saveTask(value, id) {
    const task = Task({
      _id: new mongoose.Types.ObjectId(),
      title: value.title,
      description: value.description,
      priority: value.priority,
      type: value.type,
      createdBy: id,
    });
    const saveTask = await task.save();
    return saveTask;
  }

  async getTasks(userId, filter) {
    if (filter === "All") {
      const tasks = await Task.find({ createdBy: userId }).sort({
        createdAt: -1,
      });
      return tasks;
    } else {
      const tasks = await Task.find({
        createdBy: userId,
        priority: filter,
      }).sort({
        createdAt: -1,
      });
      return tasks;
    }
  }

  async updatedTask(id, key, value) {
    const task = await Task.findByIdAndUpdate(
      id,
      { $set: { [key]: value } },
      { new: true }
    );
    try {
      return task;
    } catch (error) {
      return false;
    }
  }

  async updateFullTask(id, title, description, priority, status) {
    const task = await Task.findByIdAndUpdate(
      id,
      {
        $set: {
          title: title,
          description: description,
          priority: priority,
          status: status,
        },
      },
      { new: true }
    );

    try {
      return task;
    } catch (error) {
      return false;
    }
  }

  async deleteTaskById(id) {
    const task = await Task.findByIdAndDelete(id);
    try {
      return task;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new TaskQuery();
