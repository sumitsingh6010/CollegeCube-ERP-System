
const Message = require("../models/Message");
const User = require("../models/User");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");


  //  Resolve department from User model

const resolveDepartment = async (userId) => {
  const user = await User.findById(userId).select("departmentId");
  if (!user) return null;
  return user.departmentId;
};

/* =====================================================
   GET USERS FOR LEFT PANEL
===================================================== */
exports.getDepartmentUsers = async (req, res) => {
  try {
    console.log("📌 Fetching department users for messenger");

    const { userId } = req.user;

    const departmentId = await resolveDepartment(userId);

    if (!departmentId) {
      return res.status(400).json({ message: "Department not resolved" });
    }

    const users = await User.find({
      departmentId,
      _id: { $ne: userId },  //except self
    }).select("name role");

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Failed to fetch department users", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* =====================================================
    FETCH PRIVATE CONVERSATION
===================================================== */
exports.getPrivateConversation = async (req, res) => {
  try {
    console.log("📌 Fetching private conversation");

    const { receiverId } = req.params;
    const { userId } = req.user;

    const departmentId = await resolveDepartment(userId);

    if (!departmentId) {
      return res.status(400).json({ message: "Department not resolved" });
    }

    const messages = await Message.find({
      type: "PRIVATE",
      departmentId,
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    })
      .populate("senderId", "name role")
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json(messages);
  } catch (error) {
    console.error("❌ Failed to fetch private messages", error);
    res.status(500).json({ message: "Failed to fetch conversation" });
  }
};

/* =====================================================
   3️⃣ SEND PRIVATE MESSAGE
===================================================== */
exports.sendPrivateMessage = async (req, res) => {
  try {
    console.log("📌 Sending private message");

    const { receiverId, content } = req.body;
    const { userId } = req.user;

    if (!receiverId || !content) {
      return res.status(400).json({ message: "Invalid message data" });
    }

    const departmentId = await resolveDepartment(userId);

    if (!departmentId) {
      return res.status(400).json({ message: "Department not resolved" });
    }

    const message = await Message.create({
      type: "PRIVATE",
      senderId: userId,
      receiverId,
      departmentId,
      content,
    });

    // ✅ RETURN POPULATED MESSAGE (fix shape mismatch)
    const populatedMessage = await Message.findById(message._id)
      .populate("senderId", "name role");

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("❌ Failed to send private message", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

/* =====================================================
 FETCH GROUP MESSAGES
===================================================== */
exports.getGroupMessages = async (req, res) => {
  try {
    console.log("📌 Fetching group messages");

    const { userId } = req.user;

    const departmentId = await resolveDepartment(userId);

    if (!departmentId) {
      return res.status(400).json({ message: "Department not resolved" });
    }

    const messages = await Message.find({
      type: "GROUP",
      departmentId,
    })
      .populate("senderId", "name role")
       .sort({ createdAt: 1 })
      .limit(50);

    res.status(200).json(messages);
  } catch (error) {
    console.error("❌ Failed to fetch group messages", error);
    res.status(500).json({ message: "Failed to fetch group messages" });
  }
};

/* =====================================================
    SEND GROUP MESSAGE
===================================================== */
exports.sendGroupMessage = async (req, res) => {
  try {
    console.log("📌 Sending group message");

    const { content } = req.body;
    const { userId } = req.user;

    if (!content) {
      return res.status(400).json({ message: "Message content required" });
    }

    const departmentId = await resolveDepartment(userId);

    if (!departmentId) {
      return res.status(400).json({ message: "Department not resolved" });
    }

    const message = await Message.create({
      type: "GROUP",
      senderId: userId,
      departmentId,
      content,
    });

    
    const populatedMessage = await Message.findById(message._id)
      .populate("senderId", "name role");

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("❌ Failed to send group message", error);
    res.status(500).json({ message: "Failed to send group message" });
  }
};


exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.userId; // from JWT

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // ✅ STUDENT LOGIC
    if (user.role === "STUDENT") {
      if (message.senderId.toString() !== userId) {
        return res.status(403).json({
          message: "You can delete only your own messages",
        });
      }
    }

    // ✅ FACULTY LOGIC
    if (user.role === "FACULTY") {
      const faculty = await Faculty.findOne({ userId });

      if (!faculty) {
        return res.status(404).json({ message: "Faculty not found" });
      }

      // allow deletion only inside same department
      if (
        message.departmentId.toString() !==
        faculty.departmentId.toString()
      ) {
        return res.status(403).json({
          message: "Not allowed to delete outside your department",
        });
      }
    }

    // ADMIN (Later)
    // if (user.role === "ADMIN") -> allow everything

    await message.deleteOne();

    return res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
