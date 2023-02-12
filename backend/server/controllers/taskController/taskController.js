/** @format */
const { validateTaskCreate } = require("../../helper/helper");
const {
  saveTask,
  getTasks,
  updatedTask,
  updateFullTask,
  deleteTaskById,
} = require("../../query/taskQuery/taskQuery");

// user
const {
  updateUserCompleteTask,
  updateTaskInUser,
} = require("../../query/userQuery/userQuery");
var createError = require("http-errors");

class TaskController {
  constructor() {
    console.log("Task controller init!");
  }

  // *** Create new task
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

  // *** Fetch all user task
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

  // *** Pinned task
  async taskPin(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Task id is not present");
      } else {
        const task = await updatedTask(req.params.id, "pinn", true);
        if (!task) {
          throw createError.InternalServerError("Something went wrong");
        } else {
          return res.status(200).json({ msg: "You pinned this task", task });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // *** Unpinned task
  async taskUnpin(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Task id is not present");
      } else {
        const task = await updatedTask(req.params.id, "pinn", false);
        if (!task) {
          throw createError.InternalServerError("Something went wrong");
        } else {
          return res.status(200).json({ msg: "You unpinned this task", task });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // *** Edit task status
  async editTaskStatus(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Task id is not present");
      } else {
        const task = await updatedTask(req.params.id, "status", "completed");
        if (!task) {
          throw createError.InternalServerError("Something went wrong");
        } else {
          const updateUser = await updateUserCompleteTask(
            req.params.id,
            req.user._id
          );
          return res
            .status(200)
            .json({ msg: "You successfully completed this task", task });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // *** Edit task
  async editTaskDetails(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Task id is not present");
      } else {
        if (
          !req.body.title.trim() ||
          !req.body.description.trim() ||
          !req.body.priority.trim() ||
          !req.body.status.trim()
        ) {
          throw createError.Conflict("Invalid request body");
        } else {
          const task = await updateFullTask(
            req.params.id,
            req.body.title,
            req.body.description,
            req.body.priority,
            req.body.status
          );
          if (!task) {
            throw createError.InternalServerError("Something went wrong");
          } else {
            return res
              .status(200)
              .json({ msg: "You successfully updated this task", task });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Task id is not present");
      } else {
        const task = await deleteTaskById(req.params.id);
        if (!task) {
          throw createError.InternalServerError("something went wrong");
        } else {
          return res
            .status(200)
            .json({ msg: "Successfully deleted task", task });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // *** Update task priority
  async updateTaskPriority(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.Conflict("Task id is not present");
      } else {
        const task = await updatedTask(
          req.params.id,
          "priority",
          req.query.priority
        );
        if (!task) {
          throw createError.InternalServerError("Something went wrong");
        } else {
          return res.status(200).json({
            msg: `You successfully updated task priority to ${req.query.priority.toLowerCase()}`,
            task,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
