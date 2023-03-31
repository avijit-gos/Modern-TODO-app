/** @format */

const Message = require("../../model/messageModal/MessageModal");
const Chat = require("../../model/chatModal/chatModal");
const mongoose = require("mongoose");
const { uploadImage } = require("../../helper/helper");

class MessageQuery {
  constructor() {
    console.log("Message query init!!");
  }

  // ** 1. Save message in DB
  async createNewMessage(content, files, userID, chatId) {
    if (!files) {
      const data = Message({
        _id: new mongoose.Types.ObjectId(),
        content: content,
        sender: userID,
        chatId: chatId,
      });
      const messageData = await data.save();
      try {
        const chat = await Chat.findByIdAndUpdate(
          chatId,
          {
            $set: { lastMsg: messageData._id },
          },
          { new: true }
        );
        try {
          const message = await Message.findById(messageData._id).populate({
            path: "sender",
            select: {
              _id: 1,
              name: 1,
              profilePic: 1,
            },
          });
          try {
            return message;
          } catch (error) {
            return false;
          }
        } catch (error) {
          return false;
        }
      } catch (error) {
        return false;
      }
    } else {
      const image = await uploadImage(files.image);
      const data = Message({
        _id: new mongoose.Types.ObjectId(),
        content: content,
        image: image.url,
        sender: userID,
        chatId: chatId,
      });
      const messageData = await data.save();
      try {
        const chat = await Chat.findByIdAndUpdate(
          chatId,
          {
            $set: { lastMsg: messageData._id },
          },
          { new: true }
        );
        try {
          const message = await Message.findById(messageData._id).populate({
            path: "sender",
            select: {
              _id: 1,
              name: 1,
              profilePic: 1,
            },
          });
          try {
            return message;
          } catch (error) {
            return false;
          }
        } catch (error) {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
  }

  async getMessages(chatId, page, limit) {
    const messages = await Message.find({ chatId: chatId })
      .populate({
        path: "sender",
        select: { _id: 1, name: 1, profilePic: 1 },
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page);
    try {
      return messages.reverse();
    } catch (error) {
      return false;
    }
  }

  async updateMessage(messageId, key, value, result) {
    console.log("Call");
    var data;
    if (result) {
      data = await Message.findByIdAndUpdate(
        messageId,
        { $set: { content: value, image: result.url } },
        { new: true }
      );
      console.log(data);
    } else {
      data = await Message.findByIdAndUpdate(
        messageId,
        { $set: { [key]: value } },
        { new: true }
      );
    }
    try {
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateMessageArray(messageId, key, userId) {
    const data = await Message.findById(messageId).select(key);
    const isPresent = data[key] && data[key].includes(userId);
    const options = isPresent ? "$pull" : "$addToSet";
    const updatedData = await Message.findByIdAndUpdate(
      messageId,
      { [options]: { [key]: userId } },
      { new: true }
    );
    try {
      return key === "like"
        ? isPresent
          ? "Remove like"
          : "Add like"
        : isPresent
        ? "Remove bookmark"
        : "Add bookmark";
    } catch (error) {
      return false;
    }
  }

  async deleteSavedMessage(messageId) {
    const data = await Message.findByIdAndRemove(messageId);
    return data;
    // const removeLastMessage = await Chat.findByIdAndUpdate(
    //   data.chatId,
    //   { $set: { lastMsg: messageId } },
    //   { new: true }
    // );
    // const chatData = await Chat.findById(data.chatId);
    // console.log(chatData);
  }
}

module.exports = new MessageQuery();
