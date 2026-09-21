const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/roleMiddleware");

const {
  getDepartments,
  getFacultyByDepartment,
  getStudentDepartments,
  getStudentsByDepartment,
} = require("../controllers/adminController");

const { getDashboardStats } = require("../controllers/dashboardStatsController");

// ================= DASHBOARD =================
router.get("/dashboard-stats", auth, isAdmin, getDashboardStats);

// ================= FACULTY =================
router.get("/faculty/departments", auth, isAdmin, getDepartments);
router.get("/faculty", auth, isAdmin, getFacultyByDepartment);

// ================= STUDENTS =================
router.get("/student/departments", auth, isAdmin, getStudentDepartments);
router.get("/student", auth, isAdmin, getStudentsByDepartment);

module.exports = router;
