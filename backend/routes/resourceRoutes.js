const express = require("express");
const router = express.Router();
const ResourceFolder = require("../models/ResourceFolder");

// ✅ GET all folders
router.get("/folders", async (req, res) => {
  try {
    const folders = await ResourceFolder.find().sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch folders" });
  }
});

// ✅ POST: Add new folder
router.post("/add-folder", async (req, res) => {
  try {
    const folder = new ResourceFolder(req.body);
    await folder.save();
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to add folder" });
  }
});

// ✅ POST: Add file to folder
router.post("/add-file", async (req, res) => {
  const { folderName, url } = req.body;
  try {
    const folder = await ResourceFolder.findOne({ name: folderName });
    if (!folder) return res.status(404).json({ error: "Folder not found" });

    folder.files.push({ url });
    await folder.save();
    res.json(folder);
  } catch (err) {
    res.status(500).json({ error: "Failed to add file" });
  }
});

// ✅ DELETE: Delete folder
router.delete("/folder/:id", async (req, res) => {
  try {
    await ResourceFolder.findByIdAndDelete(req.params.id);
    res.json({ message: "Folder deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete folder" });
  }
});

// ✅ DELETE: Delete file from folder
router.delete("/folder/:folderId/file/:fileId", async (req, res) => {
  try {
    const { folderId, fileId } = req.params;
    const folder = await ResourceFolder.findById(folderId);
    if (!folder) return res.status(404).json({ error: "Folder not found" });

    folder.files = folder.files.filter((file) => file._id.toString() !== fileId);
    await folder.save();
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete file" });
  }
});

module.exports = router;
