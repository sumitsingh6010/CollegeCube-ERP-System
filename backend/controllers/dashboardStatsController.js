const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Course = require("../models/Course");

// ================= ADMIN DASHBOARD STATS =================
exports.getDashboardStats = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;

    const students = await Student.countDocuments({ collegeId });
    const faculty = await Faculty.countDocuments({ collegeId });
    const courses = await Course.countDocuments({ collegeId });

    console.log("request reached at dashboard controller ");
    console.log('student: %d',students);

    res.status(200).json({
      students,
      faculty,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};
