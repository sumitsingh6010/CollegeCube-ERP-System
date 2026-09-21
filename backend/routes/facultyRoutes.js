const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { isFaculty } = require("../middlewares/roleMiddleware");

// Controllers
const {
  markAttendance,
  getCurrentAttendanceDay,
   getAttendanceSummary,
} = require("../controllers/attendanceController");

const {
  getStudentsByDepartment,
} = require("../controllers/adminController");

/* -------------------- ATTENDANCE ROUTES -------------------- */

// Get current attendance day
router.get(
  "/attendance/current-day",
  auth,
  isFaculty,
  getCurrentAttendanceDay
);

router.get(
  "/attendance/summary/:studentId",
  auth,
  isFaculty,
  getAttendanceSummary
);

// Mark attendance
router.post(
  "/attendance/mark",
  auth,
  isFaculty,
  markAttendance
);

/* -------------------- STUDENT ROUTES (FACULTY) -------------------- */

// Get students of faculty's department
router.get(
  "/students",
  auth,
  isFaculty,
  getStudentsByDepartment
);

module.exports = router;
