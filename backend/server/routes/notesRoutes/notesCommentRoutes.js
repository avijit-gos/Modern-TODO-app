/** @format */

const router = require("express").Router();
const {
  createComment,
  editComment,
  deleteComment,
  likeComment,
  dislikeComment,
} = require("../../controllers/noteController/notesCommentController");

// 1. Create comment
router.post("/:id", createComment);
// 2. Edit comment
router.put("/edit/:id", editComment);
// 3. Delete comment
router.delete("/:id/:postId", deleteComment);
// 4. Like comment
router.put("/like/:id", likeComment);
// 5. Dislike comment
router.put("/dislike/:id", dislikeComment);
module.exports = router;
