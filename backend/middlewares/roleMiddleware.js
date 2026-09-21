exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};


exports.isFaculty = (req, res, next) => {
  if (req.user.role !== "FACULTY") {
    return res.status(403).json({ message: "Faculty access only" });
  }
  next();
};



exports.isStudent = (req, res, next) => {
  if (req.user.role !== "STUDENT") {
    return res.status(403).json({ message: "Student access only" });
  }
  next();
};
