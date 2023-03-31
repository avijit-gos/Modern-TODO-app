/** @format */

// Controller importing
const {
  createNote,
  fetchFeed,
  pinnedNote,
  bookmarkNote,
  editNote,
  deleteNote,
  likeNote,
  dislikeNote,
  fetchSingleNote,
  fetchComments,
  fetchUserNote,
  followerFeed,
} = require("../../controllers/noteController/noteController");

const router = require("express").Router();

// 1. Create note
router.post("/create", createNote);

// 2. Fetch all user related note
router.get("/fetch/:id", fetchUserNote);

// 3. fetch feed
router.get("/feed", fetchFeed);

// 4.  pin note
router.put("/pin/:id", pinnedNote);

// 5. Bookark note
router.put("/bookmark/:id", bookmarkNote);

// 6. edit note
router.put("/update/:id", editNote);

// 7. delete note
router.put("/delete/:id", deleteNote);

// 8. report note

// 9. like note
router.put("/like/:id", likeNote);

// 10. dislike note
router.put("/dislike/:id", dislikeNote);

// 11. comment note
router.get("/:id", fetchSingleNote);

// 12. Fetch single note

// 13. Fetch comments for notes
router.get("/comment/:id", fetchComments);

// 14. Fetch follower feed
router.get("/follower/feed", followerFeed);

module.exports = router;
