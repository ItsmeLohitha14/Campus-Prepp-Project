const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    // Check if it's an admin token
    if (decoded.role === "admin") {
      req.user = { role: "admin" }; // Just attach role
      return next();
    }

    // If it's a normal user, verify user ID
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token validation failed:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { verifyToken };
