const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  semester: {
    type: Number,
    required: true,
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
