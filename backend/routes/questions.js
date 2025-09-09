// routes/questions.js
const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// POST: Add a new question
router.post("/", async (req, res) => {
  try {
    const { title, leetcodeLink } = req.body;
    if (!title || !leetcodeLink) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newQuestion = new Question({ title, leetcodeLink });
    await newQuestion.save();

    res.status(201).json({ message: "Question added", question: newQuestion });
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: All questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Latest (daily) question
router.get("/daily", async (req, res) => {
  try {
    const latest = await Question.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: "No questions yet" });
    }
    res.json(latest);
  } catch (err) {
    console.error("Error fetching daily question:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// PUT: Update a question
router.put("/:id", async (req, res) => {
  try {
    const { title, leetcodeLink } = req.body;
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { title, leetcodeLink },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Updated successfully", question: updated });
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE: Delete a question
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
