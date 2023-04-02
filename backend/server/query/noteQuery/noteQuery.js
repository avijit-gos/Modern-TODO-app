/** @format */

const Note = require("../../model/notesModal/notesModal");
const Comment = require("../../model/notesModal/notesComment");
const mongoose = require("mongoose");
const User = require("../../model/userModel/userSchema");
const {
  createNotification,
} = require("../notificationQuery/notificationQuery");

class NoteQuery {
  // constructor() {
  //   console.log("Note query init!!");
  // }
  async saveNote(title, description, catagory, link1, link2, link3, id, image) {
    const newNote = Note({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      description: description,
      catagory: catagory,
      link1: link1,
      link2: link2,
      link3: link3,
      user: id,
      image: image || "",
    });
    const note = await newNote.save();
    try {
      return note;
    } catch (error) {
      return false;
    }
  }

  async fetchAllNotes(page, limit, type) {
    var notes = [];
    if (type === "all") {
      notes = await Note.find()
        .populate({
          path: "user",
          select: { _id: 1, name: 1, username: 1, profilePic: 1 },
        })
        .populate({
          path: "comment",
          populate: {
            path: "user",
            select: { _id: 1, name: 1, username: 1, profilePic: 1, flwr: 1 },
          },
          options: { limit: 1 },
        })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * page);
    } else {
      notes = await Note.find({ catagory: { $eq: type } })
        .populate({
          path: "user",
          select: { _id: 1, name: 1, username: 1, profilePic: 1 },
        })
        .populate({
          path: "comment",
          populate: {
            path: "user",
            select: { _id: 1, name: 1, username: 1, profilePic: 1 },
          },
          options: { limit: 1 },
        })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * page);
    }
    try {
      return notes;
    } catch (error) {
      return false;
    }
  }

  async findNoteById(id) {
    const note = await Note.findById(id);
    try {
      return note;
    } catch (error) {
      return false;
    }
  }

  async updatedNote(id) {
    const note = await Note.findById(id);
    if (note.pin) {
      const result = await Note.findByIdAndUpdate(
        id,
        { $set: { pin: false } },
        { new: true }
      );
      try {
        return result;
      } catch (error) {
        return false;
      }
    } else {
      const result = await Note.findByIdAndUpdate(
        id,
        { $set: { pin: true } },
        { new: true }
      );
      try {
        return result;
      } catch (error) {
        return false;
      }
    }
  }

  async updateNoteBookmark(id, userId) {
    const note = await Note.findById(id);
    const isBook = note.bookmark && note.bookmark.includes(userId);
    const option = isBook ? "$pull" : "$addToSet";
    const result = await Note.findByIdAndUpdate(
      id,
      { [option]: { bookmark: userId } },
      { new: true }
    );
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  async updateNoteInfo(id, data) {
    const result = await Note.findByIdAndUpdate(
      id,
      {
        $set: {
          title: data.title,
          description: data.description,
          catagory: data.catagory,
        },
      },
      { new: true }
    );
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  async deleteNote(id) {
    const result = await Note.findByIdAndDelete(id);
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  async updateNoteLikeDislike(id, value, userId) {
    const note = await Note.findById(id);
    if (value === "like") {
      const isDislike = note.dislikes && note.dislikes.includes(userId);
      const islike = note.likes && note.likes.includes(userId);
      const options = islike ? "$pull" : "$addToSet";
      if (isDislike) {
        const result = await Note.findByIdAndUpdate(
          id,
          { $pull: { dislikes: userId } },
          { new: true }
        );
        const updatedResult = await Note.findByIdAndUpdate(
          id,
          { [options]: { likes: userId } },
          { new: true }
        );
        try {
          // Create & Save the notification in database
          if (note.user.toString() === userId) {
            console.log("Same user");
            return updatedResult;
          } else {
            if (!islike) {
              console.log("Other user");
              const data = await createNotification(
                userId,
                note.user,
                "0",
                note._id
              );
              return updatedResult;
            }
          }
        } catch (error) {
          return false;
        }
      } else {
        const updatedResult = await Note.findByIdAndUpdate(
          id,
          { [options]: { likes: userId } },
          { new: true }
        );
        try {
          // Create & Save the notification in database
          if (note.user.toString() === userId) {
            console.log("Same user");
            return updatedResult;
          } else {
            if (!islike) {
              console.log("Other user");
              const data = await createNotification(
                userId,
                note.user,
                "0",
                note._id
              );
              return updatedResult;
            }
          }
        } catch (error) {
          return false;
        }
      }
    } else {
      const isDislike = note.dislikes && note.dislikes.includes(userId);
      const islike = note.likes && note.likes.includes(userId);
      const options = isDislike ? "$pull" : "$addToSet";
      if (islike) {
        const result = await Note.findByIdAndUpdate(
          id,
          { $pull: { likes: userId } },
          { new: true }
        );
        const updatedResult = await Note.findByIdAndUpdate(
          id,
          { [options]: { dislikes: userId } },
          { new: true }
        );
        try {
          // Create & Save the notification in database
          if (note.user.toString() === userId) {
            console.log("Same user");
            return updatedResult;
          } else {
            if (!isDislike) {
              console.log("Other user");
              const data = await createNotification(
                userId,
                note.user,
                "1",
                note._id
              );
              return updatedResult;
            }
          }
        } catch (error) {
          return false;
        }
      } else {
        const updatedResult = await Note.findByIdAndUpdate(
          id,
          { [options]: { dislikes: userId } },
          { new: true }
        );
        try {
          // Create & Save the notification in database
          if (note.user.toString() === userId) {
            console.log("Same user");
            return updatedResult;
          } else {
            if (!isDislike) {
              console.log("Other user");
              const data = await createNotification(
                userId,
                note.user,
                "1",
                note._id
              );
              return updatedResult;
            }
          }
        } catch (error) {
          return false;
        }
      }
    }
  }

  // Save comment
  async saveComment(value, postId, userId) {
    const newComment = Comment({
      _id: new mongoose.Types.ObjectId(),
      comment: value,
      postId: postId,
      user: userId,
    });
    const comment = await newComment.save();
    const result = await Comment.findById(comment._id).populate("user");
    try {
      const note = await Note.findByIdAndUpdate(postId, {
        $inc: { cmnt_count: 1 },
      });
      console.log(note);
      // return result;
      // Create & Save the notification in database
      if (note.user.toString() === userId) {
        console.log("Same user");
        return result;
      } else {
        console.log("Other user");
        const data = await createNotification(userId, note.user, "2", note._id);
        return result;
      }
    } catch (error) {
      return false;
    }
  }

  // update note's array
  async updatNote(id, key, value) {
    const update = await Note.findByIdAndUpdate(
      id,
      { $addToSet: { [key]: value } },
      { new: true }
    );

    try {
      return update;
    } catch (error) {
      return false;
    }
  }

  // Delete comment
  async deleteNoteComment(id, postId) {
    const comment = await Comment.findByIdAndDelete(id);
    try {
      console.log(comment);
      const note = await Note.findByIdAndUpdate(
        postId,
        { $pull: { comment: id } },
        { new: true }
      );
      const noteResult = await Note.findByIdAndUpdate(
        postId,
        { $inc: { cmnt_count: -1 } },
        { new: true }
      );
      try {
        return comment;
      } catch (error) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // update comment
  async updateComment(id, value) {
    const result = await Comment.findByIdAndUpdate(
      id,
      { $set: { comment: value } },
      { new: true }
    );
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  // Comment like dislike
  async commentLikeDislike(id, key, userId) {
    const comment = await Comment.findById(id);
    if (key === "like") {
      const isDislike = comment.dislikes && comment.dislikes.includes(userId);
      const isLiked = comment.likes && comment.likes.includes(userId);
      const options = isLiked ? "$pull" : "$addToSet";
      if (isDislike) {
        const removeDislike = await Comment.findByIdAndUpdate(id, {
          $pull: { dislikes: userId },
        });
        const result = await Comment.findByIdAndUpdate(
          id,
          { [options]: { likes: userId } },
          { new: true }
        );
        try {
          // return result;
          // Create & Save the notification in database
          if (comment.user.toString() === userId) {
            console.log("Same user");
            return result;
          } else {
            if (!isLiked) {
              console.log("Other user");
              const data = await createNotification(
                userId,
                comment.user,
                "3",
                comment.postId
              );
              return updatedResult;
            }
          }
        } catch (error) {
          return false;
        }
      } else {
        const result = await Comment.findByIdAndUpdate(
          id,
          { [options]: { likes: userId } },
          { new: true }
        );
        try {
          // return result;
          // Create & Save the notification in database
          if (comment.user.toString() === userId) {
            console.log("Same user");
            return result;
          } else {
            if (!isLiked) {
              console.log("Other user");
              const data = await createNotification(
                userId,
                comment.user,
                "3",
                comment.postId
              );
              return updatedResult;
            }
          }
        } catch (error) {
          return false;
        }
      }
    } else {
      const isDislike = comment.dislikes && comment.dislikes.includes(userId);
      const isLiked = comment.likes && comment.likes.includes(userId);
      const options = isDislike ? "$pull" : "$addToSet";
      if (isLiked) {
        const removeDislike = await Comment.findByIdAndUpdate(id, {
          $pull: { likes: userId },
        });
        const result = await Comment.findByIdAndUpdate(
          id,
          { [options]: { dislikes: userId } },
          { new: true }
        );
        try {
          // Create & Save the notification in database
          if (comment.user.toString() === userId) {
            console.log("Same user");
            return result;
          } else {
            if (!isDislike) {
              console.log("Other user");
              const data = await createNotification(
                userId,
                comment.user,
                "4",
                comment.postId
              );
              return updatedResult;
            }
          }
        } catch (error) {
          return false;
        }
      } else {
        const result = await Comment.findByIdAndUpdate(
          id,
          { [options]: { dislikes: userId } },
          { new: true }
        );
        try {
          // Create & Save the notification in database
          if (comment.user.toString() === userId) {
            console.log("Same user");
            return result;
          } else {
            if (!isDislike) {
              console.log("Other user");
              const data = await createNotification(
                userId,
                comment.user,
                "4",
                comment.postId
              );
              return updatedResult;
            }
          }
        } catch (error) {
          return false;
        }
      }
    }
  }

  // Fetch comments
  async getComments(id, limit, page) {
    const comments = await Comment.find({ postId: id })
      .populate("user")
      .limit(limit)
      .skip(limit * page)
      .sort({ createdAt: -1 })
      .exec();
    try {
      return comments;
    } catch (error) {
      return false;
    }
  }

  async fetchNotById(id) {
    const note = await Note.findById(id).populate({
      path: "user",
      select: { _id: 1, name: 1, username: 1, profilePic: 1 },
    });
    try {
      return note;
    } catch (error) {
      false;
    }
  }

  async fetchNotes(userId, page, limit) {
    const notes = await Note.find({ user: { $eq: userId } })
      .populate({
        path: "user",
        select: { _id: 1, name: 1, username: 1, profilePic: 1 },
      })
      .populate({
        path: "comment",
        populate: {
          path: "user",
          select: { _id: 1, name: 1, username: 1, profilePic: 1, flwr: 1 },
        },
        options: { limit: 1 },
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page);
    try {
      return notes;
    } catch (error) {
      return false;
    }
  }

  async followersNote(userId, page, limit) {
    const user = await User.findById(userId).select("flwr");
    const temp = user.flwr;
    const data = [];
    for (let i = 0; i < temp.length; i++) {
      const result = await Note.find({ user: { $eq: temp[i] } })
        .populate({
          path: "user",
          select: { _id: 1, name: 1, username: 1, profilePic: 1 },
        })
        .populate({
          path: "comment",
          populate: {
            path: "user",
            select: { _id: 1, name: 1, username: 1, profilePic: 1, flwr: 1 },
          },
          options: { limit: 1 },
        })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * page);

      data.push(result);
    }
    return data;
  }
}

module.exports = new NoteQuery();
