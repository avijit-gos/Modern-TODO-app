/** @format */

const mongoose = require("mongoose");
const Chat = require("../../model/chatModal/chatModal");
const User = require("../../model/userModel/userSchema");

class ChatQuery {
  constructor() {
    console.log("ChatQuery init");
  }

  // Create single chat
  async singleChat(value) {
    const isChatAlreadyExists = await Chat.findOne({
      isGroup: false,
      $and: [
        { members: { $elemMatch: { $eq: value[0] } } },
        { members: { $elemMatch: { $eq: value[1] } } },
      ],
    })
      .populate("lastMsg")
      .populate({
        path: "members",
        select: { _id: 1, name: 1, username: 1, profilePic: 1 },
      });

    if (isChatAlreadyExists) {
      console.log("Already exists");
      return isChatAlreadyExists;
    } else {
      const newChat = Chat({
        _id: new mongoose.Types.ObjectId(),
        members: value,
      });
      const data = await newChat.save();
      try {
        const result = await Chat.findById(data._id)
          .populate("lastMsg")
          .populate({
            path: "members",
            select: { _id: 1, name: 1, username: 1, profilePic: 1 },
          });
        return result;
      } catch (error) {
        return false;
      }
    }
  }

  // get all chats
  async getAllChats(value) {
    const data = await Chat.find({ members: { $elemMatch: { $eq: value } } })
      .populate("lastMsg")
      .populate({
        path: "members",
        select: { _id: 1, name: 1, profilePic: 1, username: 1 },
      })
      .sort({ createdAt: -1 });
    try {
      return data;
    } catch (error) {
      return false;
    }
  }

  // fetch Single Chat by id
  async fetchSingleChat(value) {
    const data = await Chat.findById(value).populate({
      path: "members",
      select: {
        _id: 1,
        name: 1,
        profilePic: 1,
        username: 1,
        group: 1,
      },
    });
    try {
      return data;
    } catch (error) {
      return false;
    }
  }

  // Save newly created group in DB
  async saveGroupData(name, members, userId) {
    const newGoup = Chat({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      members: members,
      admin: userId,
      isGroup: true,
    });
    const data = await newGoup.save();
    try {
      for (let i = 0; i < members.length; i++) {
        const user = await User.findByIdAndUpdate(
          members[i],
          { $addToSet: { group: data._id } },
          { new: true }
        );
      }
      const groupData = await Chat.findById(data._id).populate({
        path: "members",
        select: { _id: 1, profilePic: 1, name: 1, username: 1 },
      });
      return groupData;
    } catch (error) {
      return false;
    }
  }

  // upload group profile image
  async uploadGroupImage(id, key, value) {
    const data = await Chat.findByIdAndUpdate(
      id,
      { $set: { [key]: value } },
      { new: true }
    );
    try {
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateGroupMember(key, id, userId) {
    const chat = await Chat.findById(id);
    const isPresent = chat[key] && chat[key].includes(userId);
    const options = isPresent ? "$pull" : "$addToSet";

    const update = await Chat.findByIdAndUpdate(
      id,
      { [options]: { [key]: userId } },
      { new: true }
    );

    try {
      if (key === "members") {
        console.log("ADDING **");
        const user = await User.findByIdAndUpdate(
          userId,
          { [options]: { group: id } },
          { new: true }
        );
        console.log(user);
      }
      return key === "members"
        ? isPresent
          ? "Member removed from group"
          : "New member added in group"
        : key === "mods"
        ? isPresent
          ? "User removed from group mod"
          : "New member added as group mod"
        : isPresent
        ? "You remove this group from bookmark"
        : "You add this group in bookmark";
    } catch (error) {
      return false;
    }
  }

  async deleteChat(id) {
    const data = await Chat.findByIdAndDelete(id);
    try {
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateBlockUser(id, userId, profileId) {
    console.log(profileId);
  }

  async updateGroupInfo(id, name, description, privacy) {
    const data = await Chat.findByIdAndUpdate(
      id,
      {
        $set: { name: name, description: description, privacy: privacy },
      },
      { new: true }
    );

    try {
      return data;
    } catch (error) {
      return false;
    }
  }

  async handleSearchChat(name, id) {
    console.log(name);
    const key = name
      ? {
          $or: [{ name: { $regex: name, $options: "i" } }],
        }
      : {};

    const result = await Chat.find(key)
      .find({ isGroup: { $eq: true } })
      .populate({
        path: "members",
        select: {
          _id: 1,
          name: 1,
          profilePic: 1,
          username: 1,
          group: 1,
        },
      });
    return result;
  }
}

module.exports = new ChatQuery();
