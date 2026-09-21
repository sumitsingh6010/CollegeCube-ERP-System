const Application = require("../models/Application");
const Student = require("../models/Student");



exports.sendApplication = async (req, res) => {
  try {

    const { receiverRole, subject, message,category } = req.body;

    console.log("Application request body:", req.body);

    if (!receiverRole || !subject || !message || !category ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const student = await Student.findOne({
      userId: req.user.userId,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const application = await Application.create({
      studentId: student._id,
      collegeId: req.user.collegeId,
      receiverRole,
      subject,
      message,
      category ,
    });

    res.status(201).json({
      success: true,
      message: "Application sent successfully",
      application,
    });

  } catch (err) {

    console.error("Send Application Error:", err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getStudentApplications = async (req,res)=>{
 try{

  const student = await Student.findOne({ userId: req.user.userId });

  const applications = await Application.find({
    studentId: student._id
  }).sort({createdAt:-1});

  res.json({applications});

 }catch(err){
  res.status(500).json({message:err.message});
 }
};


exports.getInboxApplications = async (req,res)=>{
 try{

  const applications = await Application.find({
    receiverRole: req.user.role,
    collegeId: req.user.collegeId
  })
  .populate("studentId","name")
  .sort({createdAt:-1});

  res.json({applications});

 }catch(err){
  res.status(500).json({message:err.message});
 }
};


exports.updateApplicationStatus = async (req,res)=>{
 try{

  const { applicationId, status } = req.body;

  const application = await Application.findByIdAndUpdate(
    applicationId,
    { status },
    { new:true }
  );

  res.json({application});

 }catch(err){
  res.status(500).json({message:err.message});
 }
};