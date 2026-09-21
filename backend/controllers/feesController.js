const Fees = require("../models/Fees");
const Student = require("../models/Student");
const Department = require("../models/Department");
const razorpay = require("../config/razorpay");


/* ================= CREATE RAZORPAY ORDER ================= */
exports.createFeesOrder = async (req, res) => {
  try {
    console.log("📌 Creating fees order");

    const { amount } = req.body;
    const {  collegeId } = req.user.collegeId;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

     const student = await Student.findOne({ userId: req.user.userId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    let studentId = student._id;
    let fees = await Fees.findOne({ studentId });

    // 🧠 Create fees record if not exists
    if (!fees) {
      console.log("ℹ️ Fees record not found, creating new one");

      const department = await Department.findById(student.departmentId);

      fees = await Fees.create({
        studentId,
        departmentId: student.departmentId,
        totalAmount: department.totalFees,
      });
    }

    const remainingAmount = fees.totalAmount - fees.paidAmount;

    if (amount > remainingAmount) {
      return res
        .status(400)
        .json({ message: "Amount exceeds remaining fees" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `fees_${Date.now()}`,
    });

    res.status(200).json({
      order,
      feesId: fees._id,
    });
  } catch (error) {
    console.error("❌ Fees order creation failed", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};


const crypto = require("crypto");

/* ================= VERIFY PAYMENT ================= */
exports.verifyFeesPayment = async (req, res) => {
  try {
    console.log("📌 Verifying fees payment");

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      feesId,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const fees = await Fees.findById(feesId);
    if (!fees) {
      return res.status(404).json({ message: "Fees record not found" });
    }


    const alreadyPaid = fees.payments?.some(
      (p) => p.razorpay_payment_id === razorpay_payment_id
    );

    if (alreadyPaid) {
      console.log("ℹ️ Payment already recorded");
      return res.status(200).json({
        message: "Payment already processed",
        paidAmount: fees.paidAmount,
        status: fees.status,
      });
    }

    fees.paidAmount += amount;

    if (fees.paidAmount >= fees.totalAmount) {
      fees.status = "PAID";
    } else {
      fees.status = "PARTIAL";
    }

    await fees.save();

    console.log(" Fees payment verified & updated");

    res.status(200).json({
      message: "Payment successful",
      paidAmount: fees.paidAmount,
      status: fees.status,
    });
  } catch (error) {
    console.error(" Fees payment verification failed", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};




/* ================= GET STUDENT FEES SUMMARY ================= */
exports.getMyFees = async (req, res) => {
  try {
    console.log(" Fetching student fees summary");

    // const userId = req.user._id; // USER ID from token

    
    const student = await Student.findOne({ userId: req.user.userId });
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    //  Find fees record
    let fees = await Fees.findOne({ studentId: student._id });

    // Create fees if not exists (old students)
    if (!fees) {
      console.log("Fees record not found, creating new");

      const department = await Department.findById(student.departmentId);

      fees = await Fees.create({
        studentId: student._id,
        departmentId: student.departmentId,
        totalAmount: department.totalFees,
        paidAmount: 0,
        status: "PENDING",
      });
    }

    let dueAmount = fees.totalAmount - fees.paidAmount;
    let totalamount = fees.totalAmount;
    let paidamount=fees.paidAmount;
    dueAmount=totalamount-paidamount
     
    
    
      
    
    res.status(200).json({
      totalAmount: totalamount,
      paidAmount: paidamount,
      dueAmount,
      status: fees.status,
    });
  } catch (error) {
    console.error("❌ Failed to fetch fees summary", error);
    res.status(500).json({ message: "Failed to fetch fees" });
  }
};


exports.getAdminFeesDashboard = async (req, res) => {

  try {

    const collegeId = req.user.collegeId;

    // Get all students of the college
    const students = await Student.find({ collegeId })
      .populate("departmentId", "name");

    const studentIds = students.map(s => s._id);

    // Fetch fees for those students
    const feesList = await Fees.find({
      studentId: { $in: studentIds }
    });

    // Map fees by studentId
    const feesMap = {};

    feesList.forEach(fee => {
      feesMap[fee.studentId] = fee;
    });

    let totalFee = 0;
    let collected = 0;

    const studentsData = students.map(student => {

      const fee = feesMap[student._id];

      const total = fee?.totalAmount || 0;
      const paid = fee?.paidAmount || 0;

      totalFee += total;
      collected += paid;

      const remaining = total - paid;

      return {

        studentId: student._id,

        name: student.name,

        department: student.departmentId?.name || "N/A",

        totalFee: total,

        paid,

        remaining,

        status: remaining === 0 ? "PAID" : "PENDING"

      };

    });

    const pending = totalFee - collected;

    res.status(200).json({

      stats: {
        totalFee,
        collected,
        pending
      },

      students: studentsData

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch fees dashboard"
    });

  }

};
