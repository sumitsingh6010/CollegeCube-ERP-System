const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
     name: { type: String, required: true },
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

    designation: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
