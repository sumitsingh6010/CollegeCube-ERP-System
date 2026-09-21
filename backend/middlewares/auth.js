const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("🔑 Decoded user:", req.user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
