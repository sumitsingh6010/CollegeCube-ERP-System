const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  try {
    console.log("📌 Creating announcement");

    const { title, message, expiresAt } = req.body;
    const { userId, role, collegeId } = req.user;

    if (!title || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role !== "ADMIN" && role !== "FACULTY") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const announcement = await Announcement.create({
      title,
      message,
      expiresAt: expiresAt || null,
      createdBy: userId,
      role,
      collegeId,
    });

    res.status(201).json(announcement);
  } catch (error) {
    console.error("❌ Failed to create announcement", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getAnnouncements = async (req, res) => {
  try {
    console.log("📌 Fetching announcements");

    const { collegeId } = req.user;
    const now = new Date();

    const announcements = await Announcement.find({
      collegeId,
      isDeleted: false,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: now } },
      ],
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(announcements);
  } catch (error) {
    console.error("❌ Failed to fetch announcements", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteAnnouncement = async (req, res) => {
  try {
    console.log("📌 Soft deleting announcement");

    const { id } = req.params;
    const { userId, role, collegeId } = req.user;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    if (announcement.collegeId.toString() !== collegeId) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (
      role === "FACULTY" &&
      announcement.createdBy.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    announcement.isDeleted = true;
    await announcement.save();

    res.json({ message: "Announcement removed" });
  } catch (error) {
    console.error("❌ Delete failed", error);
    res.status(500).json({ message: "Server error" });
  }
};
