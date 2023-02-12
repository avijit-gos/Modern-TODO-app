/** @format */

const router = require("express").Router();

const {
  createTask,
  fetchTasks,
  fetchSingleTasks,
  editTaskDetails,
  editTaskStatus,
  deleteTask,
  taskPin,
  taskUnpin,
  updateTaskPriority,
} = require("../../controllers/taskController/taskController");

router.post("/create", createTask); //done
router.get("/fetch", fetchTasks); //done
// router.get("/fetch/:id", fetchSingleTasks);
router.put("/update/:id", editTaskDetails);
router.put("/pin/:id", taskPin); //done
router.put("/unpin/:id", taskUnpin); //done
router.put("/update/status/:id", editTaskStatus); //done
router.put("/update/priority/:id", updateTaskPriority); //done
router.delete("/delete/:id", deleteTask);

module.exports = router;
