const Department = require("../models/Department");
const Student = require("../models/Student");
const User = require("../models/User");
const Faculty= require("../models/Faculty");
const mongoose = require("mongoose");

/**
 * GET departments with student count
 */
exports.getStudentDepartments = async (req, res) => {
  try {
    // const collegeId = req.user.collegeId;

    
   const collegeId = "697a4d1bf4e418a4f1bcaa66"; //default id for temporary use
  
    const departments = await Department.find({ collegeId });

    const result = await Promise.all(
      departments.map(async (dept) => {
        const count = await Student.countDocuments({
  $expr: {
    $eq: [
      { $toString: "$departmentId" },
      dept._id.toString(),
    ],
  },
});


        return {
          _id: dept._id,
          name: dept.name,
          count,
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET students by department (NO populate, MANUAL user join)
 */


exports.getStudentsByDepartment = async (req, res) => {
  try {

    console.log("get student controller hit ");
   let { departmentId } = req.query;

if (!departmentId) {
  const faculty = await Faculty.findOne({ userId: req.user.userId });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

     departmentId = faculty.departmentId;
     console.log(departmentId);
}

    const students = await Student.find({
      $expr: {
        $eq: [
          { $toString: "$departmentId" },
          departmentId.toString(),
        ],
      },
    }).populate("userId", "name email");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// ================= GET ALL DEPARTMENTS =================
exports.getDepartments = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;

    const departments = await Department.find({ collegeId });

    const departmentsWithCount = await Promise.all(
      departments.map(async (dept) => {
        const count = await Faculty.countDocuments({
          departmentId: dept._id,
        });

       
    

        return {
          _id: dept._id,
          name: dept.name,
          facultyCount: count,
        };
      })
    );

    res.status(200).json(departmentsWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET FACULTY BY DEPARTMENT =================
exports.getFacultyByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.query;

    const faculty = await Faculty.find({
      departmentId: departmentId.toString(),
    }).populate("userId", "name email");

    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
