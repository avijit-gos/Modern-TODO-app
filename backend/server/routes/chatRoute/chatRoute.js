/** @format */

const {
  createSingleChat,
  fetchChats,
  createGroupChat,
  updateGroupImage,
  updateGroupName,
  updateGroupPrivacy,
  addGroupMembers,
  addGroupMod,
  deleteGroup,
  bookmarkGroup,
  fetchOneSingleChat,
  blockChat,
  searchChat,
} = require("../../controllers/chatController/chatController");

const router = require("express").Router();

// 1. Create single chat
router.post("/", createSingleChat);

// 2. Fetch all user related chat
router.get("/", fetchChats);

// 3. Create group chat
router.post("/group", createGroupChat);

// 4. Update group chat profile Pic
router.put("/group/image/:id", updateGroupImage);

// 5. Update group chat name
router.put("/group/name/:id", updateGroupName);

// 6. Update group chat privacy
router.put("/group/privacy/:id", updateGroupPrivacy);

// 7. add group members
router.put("/group/add/members/:id", addGroupMembers);

// 8. add to mod
router.put("/group/add/mod/:id", addGroupMod);

// 9. Delete group
router.delete("/:id", deleteGroup);

// 10. Bookmark group
router.put("/group/bookmark/:id", bookmarkGroup);

// 11. fetch particular single chat
router.get("/single/:id", fetchOneSingleChat);

// 12. Block chat
router.put("/block/:id", blockChat);

// 13. Search user chat
router.get("/search_chat", searchChat);

module.exports = router;
