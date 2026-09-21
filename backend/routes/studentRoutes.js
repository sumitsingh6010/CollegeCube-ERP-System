const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { isStudent } = require("../middlewares/roleMiddleware");
const Student = require("../models/Student");

const { getAttendanceSummary,} = require("../controllers/attendanceController");
const { createFeesOrder, verifyFeesPayment,getMyFees,} = require("../controllers/feesController");


//FEES
router.post(
  "/fees/create-order",
  auth,
  isStudent,
  createFeesOrder
);

router.get(
  "/fees",
  auth,
  isStudent,
  getMyFees
);

router.post(
  "/fees/verify-payment",
  auth,
  isStudent,
  verifyFeesPayment
);

//ATTENDANCE 



router.get(
  "/attendance/summary",
  auth,
  isStudent,
  async (req, res) => {
    try {
      const student = await Student.findOne({ userId: req.user.userId });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      req.params.studentId = student._id;
      return getAttendanceSummary(req, res);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);


module.exports = router;
