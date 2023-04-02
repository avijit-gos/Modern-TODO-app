/** @format */

const router = require("express").Router();
const {
  fetchNotification,
} = require("../../controllers/notificationController/notificationController");

router.get("/", fetchNotification);
module.exports = router;
