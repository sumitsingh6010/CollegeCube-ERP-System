const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    duration: { type: Number }, // years

     collegeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "College",
          required: true,
        },

    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
