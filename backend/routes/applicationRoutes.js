const express = require("express");
const router = express.Router();

const {
 sendApplication,
 getStudentApplications,
 getInboxApplications,
 updateApplicationStatus
} = require("../controllers/applicationController");

const { auth } = require("../middlewares/auth");

router.post("/send", auth, sendApplication);

router.get("/student", auth, getStudentApplications);

router.get("/inbox", auth, getInboxApplications);

router.put("/status", auth, updateApplicationStatus);

module.exports = router;