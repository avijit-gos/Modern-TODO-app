/** @format */
const { validateTaskCreate } = require("../../helper/helper");
var createError = require("http-errors");

class TaskController {
  constructor() {
    console.log("Task controller init!");
  }

  async createTask(req, res, next) {
    try {
      const result = await validateTaskCreate(req.body);
      if (!result) {
        throw createError.Conflict("Should provide required input values");
      } else {
        console.log("HI");
      }
    } catch (error) {
      next(error);
    }
  }

  async fetchTasks(req, res, next) {}

  async fetchSingleTasks(req, res, next) {}

  async editTaskDetails(req, res, next) {}

  async editTaskStatus(req, res, next) {}

  async deleteTask(req, res, next) {}
}

module.exports = new TaskController();
