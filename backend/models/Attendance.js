const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    totalDays: {
      type: Number,
      default: 30,
    },

    currentDay: {
      type: Number,
      default: 1,
    },

    presentDays: {
      type: Number,
      default: 0,
    },

    absentDays: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
