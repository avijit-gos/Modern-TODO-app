/** @format */

const mongoose = require("mongoose");
const Notification = require("../../model/notificationModel/notification");

class NotificationQuery {
  constructor() {
    // console.log("Notification query init!!!");
  }

  // *** Save notification in DB
  async createNotification(senderId, receiverId, type, noteId) {
    var data;
    if (type !== "5") {
      data = Notification({
        _id: new mongoose.Types.ObjectId(),
        sender: senderId,
        receiver: receiverId,
        Notitype: type,
        noteId: noteId,
      });
    } else {
      console.log("Came here");
      data = Notification({
        _id: new mongoose.Types.ObjectId(),
        sender: senderId,
        receiver: receiverId,
        Notitype: type,
      });
    }
    const saveNotification = await data.save();
    const notificationData = await Notification.findById(
      saveNotification._id
    ).populate({ path: "sender", select: { _id: 1, profilePic: 1, name: 1 } });
    try {
      return notificationData;
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

  async updateNotification(userId) {
    const result = await Notification.updateMany(
      { $and: [{ receiver: userId }, { view: false }] },
      { $set: { view: true } },
      { new: true }
    );
    try {
      return result;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new NotificationQuery();
