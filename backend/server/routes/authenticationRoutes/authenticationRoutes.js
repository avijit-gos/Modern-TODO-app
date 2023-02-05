/** @format */

const router = require("express").Router();
const {
  register,
  login,
  updateProfileImage,
} = require("../../controllers/userController/userController");
const { authentication } = require("../../middleware/authentication");

router.post("/register", register);
router.post("/login", login);
router.put("/update/profile/image", updateProfileImage);

module.exports = router;
