const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  createStudent,
  createFaculty,
} = require("../controllers/AuthController");

const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.post("/signup", signup);
router.post("/login", login);

router.post("/create-student", auth, isAdmin, createStudent);
router.post("/create-faculty", auth, isAdmin, createFaculty);

module.exports = router;
