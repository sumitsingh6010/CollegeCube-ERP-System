const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");
const Student = require("../models/Student");

/*
========================================
CREATE EVENT (ADMIN ONLY)
========================================
*/


exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      venue,
      maxParticipants,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      venue,
      maxParticipants,
      createdBy: req.user.userId,      // from JWT
      collegeId: req.user.collegeId,  // from JWT
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
========================================
GET ALL EVENTS
========================================
*/
exports.getAllEvents = async (req, res) => {
  try {

    const events = await Event.find({
      collegeId: req.user.collegeId,
    }).sort({ date: 1 });

    let studentId = null;

    // if logged user is student
    if (req.user.role === "STUDENT") {
      const student = await Student.findOne({ userId: req.user.userId });
      studentId = student?._id;
    }

    const eventsWithMeta = await Promise.all(
      events.map(async (event) => {

        const count = await EventRegistration.countDocuments({
          eventId: event._id,
        });

        let registered = false;

        if (studentId) {
          const reg = await EventRegistration.findOne({
            eventId: event._id,
            studentId,
          });

          registered = !!reg;
        }

        return {
          ...event._doc,
          registeredCount: count,
          isRegistered: registered,
        };
      })
    );

    res.status(200).json({
      success: true,
      events: eventsWithMeta,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
REGISTER FOR EVENT (STUDENT ONLY)
========================================
*/
exports.registerForEvent = async (req, res) => {
  try {
  
    const student = await Student.findOne({
      userId: req.user.userId,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { eventId } = req.body;

    // Prevent duplicate registration
    const alreadyRegistered = await EventRegistration.findOne({
      eventId,
      studentId: student._id,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "Already registered",
      });
    }

    await EventRegistration.create({
      eventId,
      studentId: student._id,
    });

    res.status(200).json({
      success: true,
      message: "Successfully registered for event",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};