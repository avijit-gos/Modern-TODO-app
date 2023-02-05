/** @format */

const router = require("express").Router();
const {
  updateProfileImage,
  updateProfileName,
  searchUser,
  fetchUser,
  resetPassword,
  followUser,
} = require("../../controllers/userController/userController");

router.put("/update/profile/image", updateProfileImage);
router.put("/update/profile/name", updateProfileName);
router.get("/find/user", searchUser);
router.get("/fetch/user/:id", fetchUser);
router.put("/reset/password", resetPassword);
router.put("/follow/:id", followUser);

module.exports = router;
