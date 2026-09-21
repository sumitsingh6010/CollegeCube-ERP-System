 const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const messengerRoutes = require("./routes/messengerRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const eventRoutes = require("./routes/eventRoutes");
const notesRoutes = require("./routes/notesRoutes");
const feesRoutes = require("./routes/feesRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const app = express();

/* -------------------- GLOBAL MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- ROUTES -------------------- */
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student",studentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/messenger", messengerRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/fees",feesRoutes);


app.get("/", (req, res) => {
  res.status(200).send("College ERP Backend is running 🚀");
});


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
