/** @format */

const mongoose = require("mongoose");
const User = require("../../model/userModel/userSchema");

class UserQuery {
  constructor() {
    console.log("User query init!!");
  }

  async findUserByEmailorUsername(email, username) {
    const user = await User.findOne({
      $or: [{ email: email || "" }, { username: username || "" }],
    });
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async saveNewUser(user, hash) {
    const userData = User({
      _id: new mongoose.Types.ObjectId(),
      name: user.name,
      username: user.username,
      name: user.name || "",
      email: user.email,
      password: hash,
    });
    const newUser = await userData.save();
    try {
      return newUser;
    } catch (error) {
      return false;
    }
  }

  async updateProfilePicture(id, url) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { profilePic: url } },
      { new: true }
    );
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async updateUserName(id, name) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { name: name } },
      { new: true }
    );
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async handleSearchUser(value, user) {
    console.log(user);
    const key = value
      ? {
          $or: [
            { name: { $regex: value, $options: "i" } },
            { username: { $regex: value, $options: "i" } },
          ],
        }
      : {};

    const result = await User.find(key).find({ _id: { $ne: user } });
    return result;
  }

  async FetchUserById(id) {
    const user = await User.findById(id).select("-password");
    return user;
  }

  async UpdatePassword(id, hash) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { password: hash } },
      { new: true }
    );
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async followedUser(user, loggedUserId) {
    const isFollower = user.flwr && user.flwr.includes(loggedUserId);
    console.log("Is afollower ", isFollower);
    const option = isFollower ? "$pull" : "$addToSet";
    const follower = await User.findByIdAndUpdate(
      user._id,
      { [option]: { flwr: loggedUserId } },
      { new: true }
    );
    const followed = await User.findByIdAndUpdate(
      loggedUserId,
      { [option]: { flw: user._id } },
      { new: true }
    );
    try {
      return followed;
    } catch (error) {
      return false;
    }
  }

  async updateTaskInUser(taskId, userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { tasks: taskId } },
      { new: true }
    );
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async updateUserCompleteTask(taskId, userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { cmplt_tasks: taskId } },
      { new: true }
    );
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async updateUserInfo(id, key, value) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { [key]: value } },
      { new: true }
    );
    try {
      return user;
    } catch (error) {
      return false;
    }
  }

  async updateUserPrivacy(id, profilePrivacy, postPrivacy, msgPrivacy) {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          profilePrivacy: profilePrivacy,
          postPrivacy: postPrivacy,
          msgPrivacy: msgPrivacy,
        },
      },
      { new: true }
    );
    try {
      return user;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new UserQuery();
