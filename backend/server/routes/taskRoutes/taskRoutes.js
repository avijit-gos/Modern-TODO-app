/** @format */

const router = require("express").Router();

const {
  createTask,
  fetchTasks,
  fetchSingleTasks,
  editTaskDetails,
  editTaskStatus,
  deleteTask,
} = require("../../controllers/taskController/taskController");

router.post("/create", createTask);
router.get("/fetch", fetchTasks);
router.get("/fetch/:id", fetchSingleTasks);
router.put("/update/:id", editTaskDetails);
router.put("/update/status/:id", editTaskStatus);
router.delete("/delete/:id", deleteTask);

module.exports = router;
