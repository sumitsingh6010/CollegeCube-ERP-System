const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const messengerController = require("../controllers/messengerController");

// LEFT PANEL
router.get("/users", auth, messengerController.getDepartmentUsers);

// PRIVATE CHAT
router.get(
  "/private/:receiverId",
  auth,
  messengerController.getPrivateConversation
);
router.post(
  "/private/send",
  auth,
  messengerController.sendPrivateMessage
);

// GROUP CHAT
router.get("/group", auth, messengerController.getGroupMessages);
router.post("/group/send", auth, messengerController.sendGroupMessage);

router.delete("/delete/:messageId", auth, messengerController.deleteMessage);

module.exports = router;
