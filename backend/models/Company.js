const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  description: { type: String },
  eligibility: { type: String },
  date: { type: String },
  roles: { type: [String] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
