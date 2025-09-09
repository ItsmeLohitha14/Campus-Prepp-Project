const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth");
const LoginEvent = require("../models/LoginEvent");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // 📨 Send confirmation email
    const mailOptions = {
      from: '"Campus Prep" <' + process.env.EMAIL_USER + '>',
      to: email,
      subject: "Welcome to Campus Prep!",
      text: `Hi ${name},\n\nThank you for creating an account at Campus Prep. We're excited to have you onboard!\n\nRegards,\nCampus Prep Team`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Email send error:", err);
      } else {
        console.log("✅ Confirmation email sent:", info.response);
      }
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body; // ✅ frontend sends "username"

  try {
    const user = await User.findOne({ email: username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await LoginEvent.create({ user: user._id });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get Logged In User Info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
