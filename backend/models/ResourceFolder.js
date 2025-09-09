// backend/models/ResourceFolder.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true } // Ensures each file has its own ID for deletion
);

const resourceFolderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String },
    logo: { type: String },
    description: { type: String },
    files: [fileSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("ResourceFolder", resourceFolderSchema);
