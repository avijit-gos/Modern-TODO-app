/** @format */
const createError = require("http-errors");
const { uploadImage } = require("../../helper/helper");
const {
  singleChat,
  getAllChats,
  fetchSingleChat,
  saveGroupData,
  uploadGroupImage,
  updateGroupMember,
  deleteChat,
  updateBlockUser,
  updateGroupInfo,
  handleSearchChat,
} = require("../../query/chatQuery/chatQuery");

class ChatController {
  constructor() {
    // console.log("ChatController init!!");
  }
  // 1. Create single chat
  async createSingleChat(req, res, next) {
    try {
      const members = req.body.members;
      members.push(req.user._id);
      if (members.length <= 1) {
        throw createError.Conflict(
          "Please! select atleast one user to start chatting"
        );
      } else {
        const result = await singleChat(members);

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

  // 2. Fetch all user related chat
  async fetchChats(req, res, next) {
    try {
      const data = await getAllChats(req.user._id);
      try {
        return res.status(200).json(data);
      } catch (error) {
        throw createError.InternalServerError("Something went wrong");
      }
    } catch (error) {
      next(error);
    }
  }

  // 3. Create group chat
  async createGroupChat(req, res, next) {
    try {
      const { name, members } = req.body;
      const mem = req.body.members;
      mem.push(req.user._id);
      if (!name.trim()) {
        throw createError.NotAcceptable("Please provide group name");
      } else {
        if (mem.length < 3) {
          throw createError.NotAcceptable(
            "Atleast 2 members required to create a group"
          );
        } else {
          const data = await saveGroupData(name, mem, req.user._id);
          try {
            return res
              .status(201)
              .json({ msg: "New group has been created", group: data });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 4. Update group chat profile Pic
  async updateGroupImage(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.NotAcceptable("Request params is not present");
      } else {
        if (!req.files) {
          throw createError.NotAcceptable("No image file is present");
        } else {
          const file = req.files.image;
          const data = await uploadImage(file);
          const result = await uploadGroupImage(id, "image", data.url);
          try {
            return res
              .status(200)
              .json({ msg: "Group profile image updated", result });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 5. Update group chat name
  async updateGroupName(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.NotAcceptable("Request params is not present");
      } else {
        if (!req.body.name.trim()) {
          throw createError.NotAcceptable("You cannot set empty group name");
        } else {
          const result = await updateGroupInfo(
            id,
            req.body.name,
            req.body.description,
            req.body.privacy
          );
          try {
            return res
              .status(200)
              .json({ msg: "Group info has been updated", result });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 6. Update group chat privacy
  async updateGroupPrivacy(req, res, next) {}

  // 7. add group members
  async addGroupMembers(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const userId = req.body.userId;
        if (!userId) {
          throw createError.Conflict("User ID is not present");
        } else {
          const data = await updateGroupMember("members", id, userId);
          try {
            return res.status(200).json({ msg: data });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 8. add to mod
  async addGroupMod(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const userId = req.body.userId;
        if (!userId) {
          throw createError.Conflict("User ID is not present");
        } else {
          const data = await updateGroupMember("mods", id, userId);
          try {
            return res.status(200).json({ msg: data });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 9. Delete group
  async deleteGroup(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const data = await deleteChat(id);
        try {
          return res
            .status(200)
            .json({ msg: "You deleted this chat", chat: data });
        } catch (error) {
          throw createError.InternalServerError("Something went wrong");
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 10. Bookmnark group
  async bookmarkGroup(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const userId = req.body.userId;
        if (!userId) {
          throw createError.Conflict("User ID is not present");
        } else {
          const data = await updateGroupMember("bookmark", id, userId);
          try {
            return res.status(200).json({ msg: data });
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 11. fetch particular single chat
  async fetchOneSingleChat(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const data = await fetchSingleChat(id);
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

  // 12. Block chat by user
  async blockChat(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const userId = req.body.userId;
        if (!userId) {
          throw createError.Conflict("User id is not present");
        } else {
          const result = await updateBlockUser(id, userId, req.user._id);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 13. Search chat
  async searchChat(req, res, next) {
    try {
      const result = await handleSearchChat(req.query.key, req.user._id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatController();
