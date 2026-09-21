const Subject = require("../models/Subject");
const Notes = require("../models/Notes");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// Resolve department from User model
const resolveDepartment = async (userId) => {
  const user = await User.findById(userId).select("departmentId");
  if (!user) return null;
  return user.departmentId;
};

/* ================= GET SUBJECTS ================= */
exports.getSubjects = async (req, res) => {
  try {
    console.log("Fetching subjects");

    const { userId } = req.user;
    const departmentId = await resolveDepartment(userId);

    if (!departmentId) {
      return res.status(400).json({ message: "Department not resolved" });
    }

    const subjects = await Subject.find({
      departmentId,
    });

    res.status(200).json(subjects);
  } catch (error) {
    console.error("Failed to fetch subjects", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET NOTES ================= */
exports.getNotes = async (req, res) => {
  try {
    console.log("Fetching notes");

    const { subjectId, unit } = req.params;
    const { userId } = req.user;
    const departmentId = await resolveDepartment(userId);

    if (!departmentId) {
      return res.status(400).json({ message: "Department not resolved" });
    }

    const notes = await Notes.find({
      subjectId,
      unit,
      departmentId,
    })
      .populate("uploadedBy", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Failed to fetch notes", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPLOAD NOTE ================= */
exports.uploadNotes = async (req, res) => {
  try {
    console.log("Uploading note");

    if (req.user.role !== "FACULTY") {
      return res.status(403).json({ message: "Only faculty can upload notes" });
    }

    const { subjectId, unit, topic } = req.body;
    const { userId } = req.user;
    const departmentId = await resolveDepartment(userId);

    if (!departmentId) {
      return res.status(400).json({ message: "Department not resolved" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    
    const isPDF = req.file.mimetype === "application/pdf";

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: isPDF ? "raw" : "auto",
      folder: "college-notes",
    });

    let fileType = "PDF";

    if (result.resource_type === "image") fileType = "IMAGE";
    if (result.resource_type === "video") fileType = "VIDEO";
    if (result.resource_type === "raw") fileType = "PDF";

    const notes = await Notes.create({
      subjectId,
      unit,
      topic,
      fileUrl: result.secure_url,
      fileType,
      uploadedBy: userId,
      departmentId,
    });

    console.log("Note uploaded successfully");

    res.status(201).json(notes);
  } catch (error) {
    console.error("Upload failed", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= DELETE NOTE ================= */
exports.deleteNotes = async (req, res) => {
  try {
    console.log("Deleting note");

    const { id } = req.params;

    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (
      req.user.role !== "FACULTY" ||
      note.uploadedBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await note.deleteOne();

    console.log("Notes deleted");

    res.status(200).json({ message: "Notes deleted" });
  } catch (error) {
    console.error("Delete failed", error);
    res.status(500).json({ message: "Server error" });
  }
};
