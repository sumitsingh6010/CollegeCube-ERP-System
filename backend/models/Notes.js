const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    unit: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["IMAGE", "VIDEO", "PDF"],
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", notesSchema);
