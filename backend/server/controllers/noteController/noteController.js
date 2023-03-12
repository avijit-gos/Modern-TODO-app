/** @format */
var createError = require("http-errors");
const {
  saveNote,
  fetchAllNotes,
  updatedNote,
  updateNoteBookmark,
  updateNoteInfo,
  deleteNote,
  updateNoteLikeDislike,
  findNoteById,
  getComments,
  fetchNotById,
} = require("../../query/noteQuery/noteQuery");
const { uploadImage } = require("../../helper/helper");

class NoteController {
  constructor() {
    console.log("Note controller runnings!!");
  }

  // 1. Create note
  async createNote(req, res, next) {
    try {
      const { title, description, catagory, link1, link2, link3 } = req.body;
      // if req.files is not null that means user  upload any image

      if (req.files) {
        const uploadUrl = await uploadImage(req.files.image);
        const note = await saveNote(
          title,
          description,
          catagory,
          link1,
          link2,
          link3,
          req.user._id,
          uploadUrl.url
        );
        try {
          return res
            .status(201)
            .json({ msg: "You successfully created a new note", note });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      } else {
        if (!title.trim() || !description.trim()) {
          throw createError.Conflict(
            "Title & description are minimum requirement to create a note"
          );
        } else {
          const note = await saveNote(
            title,
            description,
            catagory,
            link1,
            link2,
            link3,
            req.user._id
          );
          try {
            return res
              .status(201)
              .json({ msg: "You successfully created a new note", note });
          } catch (error) {
            throw createError.InternalServerError(error.message);
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 2. Fetch feed notes
  async fetchFeed(req, res, next) {
    const page = req.query.page;
    const limit = req.query.limit || 10;
    const type = req.query.type || "all";
    try {
      const notes = await fetchAllNotes(page, limit, type);
      if (!notes) {
        throw createError.InternalServerError("something went wrong");
      } else {
        return res.status(200).json(notes);
      }
    } catch (error) {
      next(error);
    }
  }

  // 3. Task pin
  async pinnedNote(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request param is not present");
      } else {
        const note = await updatedNote(id);
        try {
          return res.status(200).json({
            msg: note.pin ? "You pinned this note" : "You unpinned this note",
            note,
          });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // ***4. Bookmark note
  async bookmarkNote(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request param is not present");
      } else {
        const note = await updateNoteBookmark(id, req.user._id);
        try {
          return res.status(200).json({
            msg: note.bookmark.includes(req.user._id)
              ? "You bookmark this note"
              : "You remove this note",
            note,
          });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // *** 5. Edit note
  async editNote(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const note = await updateNoteInfo(id, req.body);
        try {
          return res.status(200).json({ msg: "Note has been updated", note });
        } catch (error) {
          throw createError.Conflict(error.message);
        }
      }
    } catch (error) {
      next(error.message);
    }
  }

  // 6. Delete note
  async deleteNote(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request param is not present");
      } else {
        const note = await deleteNote(id, req.user._id);
        try {
          return res.status(200).json({ msg: "You Delete this note" });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 7. Like note
  async likeNote(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request param is not present");
      } else {
        const result = await updateNoteLikeDislike(id, "like", req.user._id);
        try {
          return res.status(200).json({ msg: "You like this post" });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 7. Dislike note
  async dislikeNote(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request param is not present");
      } else {
        const result = await updateNoteLikeDislike(id, "dislike", req.user._id);
        try {
          return res.status(200).json({ msg: "You dislike this post" });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 8. Fetch single post
  async fetchSingleNote(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request param is not present");
      } else {
        const note = await findNoteById(id);
        try {
          return res.status(200).json({ note });
        } catch (error) {
          throw createError.ServiceUnavailable(error.message);
        }
      }
    } catch (error) {
      next(error.message);
    }
  }

  // Fetch comments
  async fetchComments(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;
        const comments = await getComments(id, limit, page);
        try {
          return res.status(200).json(comments);
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async fetchNote(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const result = await fetchNotById(id);
        try {
          return res.status(200).json(result);
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NoteController();
