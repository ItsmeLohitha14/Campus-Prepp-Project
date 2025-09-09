const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../middleware/auth"); // ✅ Import middleware

// ✅ GET all users (no role filter)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // ← removed { role: "student" }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET profile of currently logged-in user
router.get("/profile", verifyToken, async (req, res) => {
  try {
    res.json(req.user); // `req.user` is populated by verifyToken middleware
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
