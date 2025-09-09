const express = require('express'); 
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth'); // ✅ Correct import

// ✅ Get current user's profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err });
  }
});

// ✅ Update user profile
router.put('/update-profile', verifyToken, async (req, res) => {
  const userId = req.user._id; // extracted from JWT by verifyToken
  const { department, year, rollNumber, cgpa, phone, skills, bio } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        department,
        year,
        rollNumber,
        cgpa,
        phone,
        skills: Array.isArray(skills) ? skills : (skills || "").split(",").map(s => s.trim()),
        bio
      },
      { new: true }
    );
    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
