/** @format */
const { validateTaskCreate } = require("../../helper/helper");
const { saveTask, getTasks } = require("../../query/taskQuery/taskQuery");
const { updateTaskInUser } = require("../../query/userQuery/userQuery");
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
        const taskData = await saveTask(result, req.user._id);
        try {
          const saveTask = await updateTaskInUser(taskData._id, req.user._id);
          if (!saveTask) {
            throw createError.InternalServerError("Something went wrong");
          } else {
            return res.status(200).json({ data: taskData });
          }
        } catch (error) {
          throw createError.InternalServerError("Something went wrong");
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async fetchTasks(req, res, next) {
    try {
      const page = req.query.page || 0;
      const limit = req.query.limit || 10;
      const data = await getTasks(req.user._id, req.query.filter);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async fetchSingleTasks(req, res, next) {}

  async editTaskDetails(req, res, next) {}

  async editTaskStatus(req, res, next) {}

  async deleteTask(req, res, next) {}
}

module.exports = new TaskController();
