const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  department: String,
  year: String,
  rollNumber: String,
  cgpa: String,
  phone: String,
  skills: [String],
  bio: String,
});

module.exports = mongoose.model("User", userSchema);
