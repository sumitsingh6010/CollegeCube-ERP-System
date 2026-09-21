const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { auth } = require("../middlewares/auth");
const {
  getSubjects,
  getNotes,
  uploadNotes,
  deleteNotes,
} = require("../controllers/notesController");

router.get("/subjects", auth, getSubjects);

router.get("/:subjectId/:unit", auth, getNotes);

router.post("/upload", auth, upload.single("file"), uploadNotes);

router.delete("/:id", auth, deleteNotes);

module.exports = router;
