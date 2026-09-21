const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement
} = require("../controllers/announcementController");
const { auth } = require("../middlewares/auth");

router.post("/", auth, createAnnouncement);
router.get("/", auth, getAnnouncements);
router.delete("/:id", auth, deleteAnnouncement);


module.exports = router;
