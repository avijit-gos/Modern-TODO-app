/** @format */

// Controller importing
const { fetchNote } = require("../controllers/noteController/noteController");

const router = require("express").Router();

router.get("/full/:id", fetchNote);

module.exports = router;
