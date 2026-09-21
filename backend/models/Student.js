const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
     name: { type: String, required: true },
    rollNumber: { type: String, required: true },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    collegeId: {                      
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    
    },
    

    semester: { type: Number, required: true },

    admissionYear: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
