const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  registerForEvent,
} = require("../controllers/eventController");

const { auth } = require("../middlewares/auth");
const { isAdmin, isStudent } = require("../middlewares/roleMiddleware");


router.get("/get-all-events", auth, getAllEvents);

// Create event (Admin only)
router.post("/create-event", auth, isAdmin, createEvent);

// Register for event (Student only)
router.post("/register-event", auth, isStudent, registerForEvent);

module.exports = router;