const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    totalFees:{
    type:Number,
    default : 70000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
