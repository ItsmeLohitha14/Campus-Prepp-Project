const mongoose = require("mongoose");

const loginEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null // ✅ this is important to allow null in admin login
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("LoginEvent", loginEventSchema);
