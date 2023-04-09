/** @format */

const router = require("express").Router();
const {
  fetchNotification,
  viewedNotification,
} = require("../../controllers/notificationController/notificationController");

router.get("/", fetchNotification);
router.put("/update", viewedNotification);
module.exports = router;
