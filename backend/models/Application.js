const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true
  },

  receiverRole: {
    type: String,
    enum: ["ADMIN","FACULTY"],
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING","APPROVED","REJECTED"],
    default: "PENDING"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);