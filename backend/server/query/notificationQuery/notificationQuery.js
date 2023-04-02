/** @format */

const mongoose = require("mongoose");
const Notification = require("../../model/notificationModel/notification");

class NotificationQuery {
  constructor() {
    console.log("Notification query init!!!");
  }

  // *** Save notification in DB
  async createNotification(senderId, receiverId, type, noteId) {
    const data = Notification({
      _id: new mongoose.Types.ObjectId(),
      sender: senderId,
      receiver: receiverId,
      Notitype: type,
      noteId: noteId,
    });
    const saveNotification = await data.save();
    try {
      return saveNotification;
    } catch (error) {
      return false;
    }
  }

  // *** fetch user related notification
  async getNotification(userId, page, limit) {
    const data = await Notification.find({ receiver: userId })
      .populate({
        path: "sender",
        select: {
          _id: 1,
          name: 1,
          profilePic: 1,
        },
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page);
    try {
      return data;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new NotificationQuery();
