/** @format */
var createError = require("http-errors");
const {
  saveComment,
  updatNote,
  deleteNoteComment,
  updateComment,
  commentLikeDislike,
} = require("../../query/noteQuery/noteQuery");

class NoteCommentController {
  constructor() {
    // console.log(`Note Comment Controller init`);
  }

  // 1. Create comment
  async createComment(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request parameter is not present");
      } else {
        if (!req.body.comment.trim()) {
          throw createError.Conflict("Content empty");
        } else {
          const comment = await saveComment(req.body.comment, id, req.user._id);
          try {
            const note = await updatNote(id, "comment", comment._id);
            try {
              return res.status(201).json({ comment });
            } catch (error) {
              throw createError.InternalServerError("Something went wrong");
            }
          } catch (error) {
            throw createError.InternalServerError("Something went wrong");
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 2. Edit comment
  async editComment(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        if (!req.body.comment.trim()) {
          throw createError.Conflict("Comment message cannot be empty");
        } else {
          const comment = await updateComment(id, req.body.comment);
          try {
            return res.status(200).json({ msg: "Comment edited", comment });
          } catch (error) {
            throw createError.InternalServerError(error.message);
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 3. Delete comment
  async deleteComment(req, res, next) {
    try {
      const id = req.params.id;
      const postId = req.params.postId;
      if (!id || !postId) {
        throw createError.Conflict("Request param is not present");
      } else {
        const comment = await deleteNoteComment(id, postId);
        try {
          try {
            return res
              .status(200)
              .json({ msg: "Successfully deleted", comment });
          } catch (error) {
            throw createError.InternalServerError(error.message);
          }
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 4. Like comment
  async likeComment(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const result = await commentLikeDislike(id, "like", req.user._id);
        try {
          return res
            .status(200)
            .json({ msg: "You liked this comment", result });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // 5. Dislike comment
  async dislikeComment(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.Conflict("Request params is not present");
      } else {
        const result = await commentLikeDislike(id, "dislike", req.user._id);
        try {
          return res
            .status(200)
            .json({ msg: "You disliked this comment", result });
        } catch (error) {
          throw createError.InternalServerError(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NoteCommentController();
