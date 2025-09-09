const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const LoginEvent = require("../models/LoginEvent");
const Company = require("../models/Company");
const { verifyToken } = require("../middleware/auth");

// ─────────────────────────────────────────────────────────
// 1. Hard‑coded admin creds (demo / dev)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "campus123";
// ─────────────────────────────────────────────────────────

// 2. Helper → only allow admin tokens through
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin privilege required" });
};

// ─────────────────────────────────────────────────────────
// 3. POST /api/admin/login → returns JWT { role: 'admin' }
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  try {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "2h" }
    );

    // (Optional) record the login
    await new LoginEvent({
      user: null,
      role: "admin",
      timestamp: new Date(),
    }).save();

    return res.json({ token });
  } catch (err) {
    console.error("Admin login error:", err.message);
    return res.status(500).json({ message: "Token generation failed" });
  }
});

// ─────────────────────────────────────────────────────────
// 4. GET /api/admin/logins → admin‑only
router.get("/logins", verifyToken, verifyAdmin, async (_, res) => {
  try {
    const logins = await LoginEvent.find().populate("user", "name email");
    res.json(logins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching login logs" });
  }
});

// ─────────────────────────────────────────────────────────
// 5. POST /api/admin/add-company → admin‑only
router.post("/add-company", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, logo, description, eligibility, date, roles } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description required" });
    }

    const company = await Company.create({
      name,
      logo,
      description,
      eligibility,
      date,
      roles,
    });

    return res.status(201).json({
      message: "Company added successfully",
      company,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ─────────────────────────────────────────────────────────
// 6. GET /api/admin/companies → any authenticated user
router.get("/companies", verifyToken, async (_, res) => {
  try {
    const companies = await Company.find().sort({ date: 1 }); // upcoming first
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
});

// ─────────────────────────────────────────────────────────
// 7. PUT /api/admin/update-company/:id → admin-only
router.put("/update-company/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedData = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(companyId, updatedData, {
      new: true,
    });

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (err) {
    console.error("Update failed", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ─────────────────────────────────────────────────────────
module.exports = router;
