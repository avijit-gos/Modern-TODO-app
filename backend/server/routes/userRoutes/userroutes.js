/** @format */

const router = require("express").Router();
const {
  updateProfileImage,
  updateProfileName,
  searchUser,
  fetchUser,
  resetPassword,
  followUser,
  updateProfileEmail,
  updateProfilePrivacy,
  updateProfileUsername,
} = require("../../controllers/userController/userController");

router.put("/update/profile/image", updateProfileImage);
router.put("/update/profile/name", updateProfileName);
router.put("/update/profile/email", updateProfileEmail);
router.put("/update/profile/username", updateProfileUsername);
router.put("/update/profile/privacy", updateProfilePrivacy);
router.get("/find/user", searchUser);
router.get("/fetch/user/:id", fetchUser);
router.put("/reset/password", resetPassword);
router.put("/follow/:id", followUser);

module.exports = router;
