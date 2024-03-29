/** @format */

const router = require("express").Router();
const {
  createMessage,
  fetchMessages,
  editMessage,
  deleteMessage,
  likeMessage,
  saveMessage,
} = require("../../controllers/messageController/messageController");

// 1. Create message
router.post("/:id", createMessage);

// 2. Fetch all messages related to a particular char
router.get("/:id", fetchMessages); // Here id is chat id

// 3. Edit message
router.put("/:id", editMessage); // Here id is message id

// 4. Delete message
router.delete("/:id", deleteMessage); // Here id is message id

// 5. Like message
router.put("/like/:id", likeMessage); // Here id is message id

// 6. Save message
router.put("/bookmark/:id", saveMessage); // Here id is message id

module.exports = router;
