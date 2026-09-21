const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Fees = require("../models/Fees");
const Faculty= require("../models/Faculty")

// ================= MARK ATTENDANCE =================
exports.markAttendance = async (req, res) => {
  try {
    console.log("📌 Mark attendance controller hit");

    const {  presentStudentIds } = req.body;
    const collegeId = req.user.collegeId;

    const faculty = await Faculty.findOne({ userId: req.user.userId });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const departmentId = faculty.departmentId;

    console.log("Department:", departmentId);
    console.log("Present count:", presentStudentIds.length);

    // 1. Fetch all students of the department
    const students = await Student.find({ departmentId, collegeId });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    console.log("Total students:", students.length);

    // 2. Loop through students
    for (const student of students) {
      let attendance = await Attendance.findOne({
        studentId: student._id,
        semester: student.semester,
      });

      // 3. If attendance not exists → create
      if (!attendance) {
        attendance = await Attendance.create({
          studentId: student._id,
          collegeId,
          departmentId,
          semester: student.semester,
        });

        console.log(`Attendance created for ${student.name}`);
      }

      // 4. Mark present / absent
      if (presentStudentIds.includes(student._id.toString())) {
        attendance.presentDays += 1;
      } else {
        attendance.absentDays += 1;
      }

      // 5. Handle day increment or reset
      if (attendance.currentDay === attendance.totalDays) {
        console.log("🔄 Day 30 reached → resetting attendance");

        attendance.currentDay = 1;
        attendance.presentDays = 0;
        attendance.absentDays = 0;

        // Increment semester
        student.semester = student.semester + 1;
        if (student.semester > 8) student.semester = 1;

        // Reset fees
        await Fees.updateOne(
          { studentId: student._id },
          { status: "PENDING" }
        );

        await student.save();
      } else {
        attendance.currentDay += 1;
      }

      await attendance.save();
    }

    console.log("✅ Attendance marked successfully");

    res.status(200).json({
      message: "Attendance marked successfully",
    });
  } catch (error) {
    console.error("❌ Attendance error:", error.message);
    res.status(500).json({ message: "Attendance marking failed" });
  }
};



// ================= GET CURRENT ATTENDANCE DAY =================
exports.getCurrentAttendanceDay = async (req, res) => {
  try {
    console.log("📌 Fetching current attendance day");

    const faculty = await Faculty.findOne({ userId: req.user.userId });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const departmentId = faculty.departmentId;

    if (!departmentId) {
      return res.status(400).json({ message: "Department not found" });
    }

    const attendance = await Attendance.findOne({ departmentId });

    if (!attendance) {
      return res.status(200).json({ currentDay: 1 });
    }

    res.status(200).json({ currentDay: attendance.currentDay });
  } catch (error) {
    console.error("❌ Failed to fetch attendance day", error);
    res.status(500).json({ message: "Failed to fetch attendance day" });
  }
};






exports.getAttendanceSummary = async (req, res) => {
  try {
    console.log("📌 Fetching attendance summary");

    const { studentId } = req.params;
    const { collegeId } = req.user;

    const attendance = await Attendance.findOne({
      studentId,
      collegeId,
    });

    // default values
    if (!attendance) {
      console.log("ℹ️ No attendance found, returning defaults");

      return res.status(200).json({
        totalDays: 30,
        presentDays: 0,
        absentDays: 0,
        pendingDays: 30,

        presentPercentage: 0,
        absentPercentage: 0,
        pendingPercentage: 100,
      });
    }

    const { presentDays, absentDays, totalDays } = attendance;

    const updatedDays = presentDays + absentDays;
    const pendingDays = totalDays - updatedDays;

    const pendingPercentage = Math.round(
      (pendingDays / totalDays) * 100
    );

    // if nothing marked yet
    if (updatedDays < 1) {
      return res.status(200).json({
        totalDays,
        presentDays,
        absentDays,
        pendingDays,

        presentPercentage: 0,
        absentPercentage: 0,
        pendingPercentage,
      });
    }

    const presentPercentage = Math.round(
      (presentDays / updatedDays) * 100
    );

    const absentPercentage = Math.round(
      (absentDays / updatedDays) * 100
    );

    res.status(200).json({
      totalDays,
      presentDays,
      absentDays,
      pendingDays,

      presentPercentage,
      absentPercentage,
      pendingPercentage,
    });
  } catch (error) {
    console.error("❌ Failed to fetch attendance summary");
    res.status(500).json({ message: "Failed to fetch attendance summary" });
  }
};
