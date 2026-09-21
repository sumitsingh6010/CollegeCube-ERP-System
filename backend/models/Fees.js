const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    totalAmount: {
      type: Number,
      default:70000,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["PENDING", "PARTIAL", "PAID"],
      default: "PENDING",
    },
    payments: [
    {
      razorpay_payment_id: String,
      amount: Number,
      paidAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fees", feesSchema);
