// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  leetcodeLink: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
