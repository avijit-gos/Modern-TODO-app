/** @format */

const mongoose = require("mongoose");
const User = require("../../model/userModel/userSchema");
const Task = require("../../model/taskModel/taskModel");

class TaskQuery {
  constructor() {
    console.log("Task query init!!");
  }
}

module.exports = new TaskQuery();
