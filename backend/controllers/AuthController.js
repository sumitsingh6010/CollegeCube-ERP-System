const User = require("../models/User");
const College = require("../models/College");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Fees= require("../models/Fees");


// ADMIN signup (college signup)
exports.signup = async (req, res) => {
  try {
    const { name, email, password, collegeName } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create college
    const college = await College.create({
      name: collegeName,
    });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create admin user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      collegeId: college._id,
    });

    // jwt
    const token = jwt.sign(
      { userId: user._id, role: user.role, collegeId: college._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
  token,
  user: {
    id: user._id,
    role: user.role
  }
});

  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

// LOGIN (admin / faculty / student)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id,
         role: user.role, 
         collegeId: user.collegeId
       },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
  token,
  user: {
    id: user._id,
    role: user.role
  }
});

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};




// ================= CREATE FACULTY =================
exports.createFaculty = async (req, res) => {
  try {
    const { name, email, password, designation, departmentId } = req.body;
    const collegeId = req.user.collegeId;

    if (!name || !email || !password || !designation || !departmentId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "FACULTY",
      collegeId,
      departmentId: departmentId,
    });
       
    console.log("request reached at faculty creation");
    
    const faculty = await Faculty.create({
      userId: user._id,
      name,
      departmentId,
      designation,
      collegeId

    });

    res.status(201).json({
      message: "Faculty created successfully",
      faculty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= CREATE STUDENT =================
exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNumber,
      departmentId,
      semester,
      admissionYear,
    } = req.body;

    const collegeId = req.user.collegeId;

    // 🔹 default course id (temporary)
    const DEFAULT_COURSE_ID = "65b8f0a1c2d3e4f567890123";

    if (
      !name ||
      !email ||
      !password ||
      !rollNumber ||
      !departmentId ||
      !semester ||
      !admissionYear
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "STUDENT",
      collegeId,
       departmentId: departmentId,
    });

    const student = await Student.create({
      userId: user._id,
      name,
      rollNumber,
      departmentId,
      courseId: DEFAULT_COURSE_ID, 
      semester,
      admissionYear,
      collegeId,
    });


    await Fees.create({
  studentId: student._id,
  totalAmount: 7, 
  paidAmount: 0,
  status: "PENDING",
  departmentId:departmentId,
});


      console.log("new student creation");
    res.status(201).json({
      message: "Student created successfully",
      student,
     
    });
  } catch (error) {
     console.log("failed");
    res.status(500).json({ message: error.message });
  }
};


// when we create a new student shall not we create it's attendance model ?
