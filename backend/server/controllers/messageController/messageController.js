/** @format */

const createError = require("http-errors");
const { uploadImage, encryptText } = require("../../helper/helper");
const {
  createNewMessage,
  getMessages,
  updateMessage,
  updateMessageArray,
  deleteSavedMessage,
} = require("../../query/messageQuery/messageQuery");

class MessageController {
  constructor() {
    // console.log("Message controller running!");
  }

  // 1. Create message
  async createMessage(req, res, next) {
    try {
      const chatId = req.params.id;
      if (!chatId) {
        throw createError.Conflict("Chat id is not present");
      } else {
        // const encryptedText = await encryptText(req.body.content);
        // console.log(encryptedText);
        const result = await createNewMessage(
          req.body.content,
          req.files,
          req.user._id,
          chatId
        );
        try {
          return res.status(201).json(result);
        } catch (error) {
          throw createError.InternalServerError("Something went wrong");
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 2. Fetch all messages related to a particular char
  async fetchMessages(req, res, next) {
    try {
      const chatId = req.params.id;
      if (!chatId) {
        throw createError.Conflict("Chat id is not present");
      } else {
        const page = req.query.page || 0;
        const limit = req.query.limit || 10;
        const data = await getMessages(chatId, page, limit);
        try {
          return res.status(200).json(data);
        } catch (error) {
          throw createError.ServiceUnavailable("Something went wrong");
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 3. Edit message
  async editMessage(req, res, next) {
    try {
      const messageId = req.params.id;
      if (!messageId) {
        throw createError.Conflict("Message id is not present");
      } else {
        // if (!req.body.content.trim()) {
        //   throw createError.Conflict("Cannot set empty string as content");
        // } else {

        // }

        if (req.files) {
          const result = await uploadImage(req.files.image);
          const data = await updateMessage(
            messageId,
            "content",
            req.body.content,
            result
          );
          try {
            return res
              .status(200)
              .json({ msg: "Message has been updated", message: data });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        } else {
          const data = await updateMessage(
            messageId,
            "content",
            req.body.content
          );
          try {
            return res
              .status(200)
              .json({ msg: "Message has been updated", message: data });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 4. Delete message
  async deleteMessage(req, res, next) {
    try {
      const messageId = req.params.id;
      if (!messageId) {
        throw createError.Conflict("Message id is not present");
      } else {
        console.log(req.user._id);
        const data = await deleteSavedMessage(messageId);
        try {
          return res
            .status(200)
            .json({ msg: "Message has been deleted", data });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 5. Like message
  async likeMessage(req, res, next) {
    try {
      const messageId = req.params.id;
      if (!messageId) {
        throw createError.Conflict("Message id is not present");
      } else {
        console.log(req.user._id);
        const data = await updateMessageArray(messageId, "like", req.user._id);
        try {
          return res.status(200).json({ msg: data });
        } catch (error) {
          throw createError.InternalServerError("Something went wrong");
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 6. Save message
  async saveMessage(req, res, next) {
    try {
      const messageId = req.params.id;
      if (!messageId) {
        throw createError.Conflict("Message id is not present");
      } else {
        console.log(req.user._id);
        const data = await updateMessageArray(
          messageId,
          "bookmark",
          req.user._id
        );
        try {
          return res.status(200).json({ msg: data });
        } catch (error) {
          throw createError.InternalServerError("Something went wrong");
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();
