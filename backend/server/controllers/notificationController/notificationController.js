/** @format */

const createError = require("http-errors");
const {
  getNotification,
} = require("../../query/notificationQuery/notificationQuery");

class NotificationController {
  constructor() {
    console.log("Notification controller");
  }
  async fetchNotification(req, res, next) {
    try {
      console.log("Fetch notification");
      const page = req.query.page || 0;
      const limit = req.query.limit || 10;
      const notifications = await getNotification(req.user._id, page, limit);
      return res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
