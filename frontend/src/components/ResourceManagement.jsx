import React, { useState, useEffect } from "react";
import { BookOpen, Plus, FileText, Trash2 } from "lucide-react";

const ResourceManagement = () => {
  const [folders, setFolders] = useState([]);
  const [openFolders, setOpenFolders] = useState({});

  const [newFolder, setNewFolder] = useState({
    name: "",
    category: "",
    description: "",
    logo: "",
  });

  const [newFile, setNewFile] = useState({
    url: "",
    folderName: "",
  });

  // ✅ Fetch folders from backend
  useEffect(() => {
    fetch("https://campus-prep-project.onrender.com/api/resources/folders")
      .then((res) => res.json())
      .then((data) => setFolders(data))
      .catch((err) => console.error("Failed to fetch folders:", err));
  }, []);

  const handleFolderChange = (e) => {
    setNewFolder({ ...newFolder, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewFile({ ...newFile, [e.target.name]: e.target.value });
  };

  const handleAddFolder = async () => {
    if (!newFolder.name) {
      alert("Folder name is required.");
      return;
    }

    const exists = folders.find((f) => f.name === newFolder.name);
    if (exists) {
      alert("Folder with this name already exists.");
      return;
    }

    try {
      const res = await fetch("https://campus-prep-project.onrender.com/api/resources/add-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newFolder, files: [] }),
      });

      const data = await res.json();
      setFolders([...folders, data]);
      setNewFolder({ name: "", category: "", description: "", logo: "" });
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  const handleAddFileToFolder = async () => {
    if (!newFile.url || !newFile.folderName) {
      alert("Please provide a file URL and select a folder.");
      return;
    }

    try {
      const res = await fetch("https://campus-prep-project.onrender.com/api/resources/add-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folderName: newFile.folderName,
          url: newFile.url,
        }),
      });

      const updatedFolder = await res.json();
      setFolders(
        folders.map((f) => (f.name === updatedFolder.name ? updatedFolder : f))
      );
      setNewFile({ url: "", folderName: "" });
    } catch (error) {
      console.error("Error adding file:", error);
    }
  };

  const handleDeleteFolder = async (id) => {
    const confirm = window.confirm("Delete entire folder and all its files?");
    if (!confirm) return;

    try {
      await fetch(`https://campus-prep-project.onrender.com/api/resources/folder/${id}`, {
        method: "DELETE",
      });
      setFolders(folders.filter((f) => f._id !== id));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleDeleteFile = async (folderId, fileId) => {
    try {
      await fetch(
        `https://campus-prep-project.onrender.com/api/resources/folder/${folderId}/file/${fileId}`, 
        { method: "DELETE" }
      );

      setFolders(
        folders.map((folder) =>
          folder._id === folderId
            ? {
                ...folder,
                files: folder.files.filter((file) => file._id !== fileId),
              }
            : folder
        )
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const toggleFolderFiles = (folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="text-purple-600" />
        <div>
          <h3 className="text-lg font-semibold text-black">Resource Library</h3>
          <p className="text-sm text-black">
            Organize resources into folders with multiple files
          </p>
        </div>
      </div>

      {/* Add Folder Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          name="name"
          value={newFolder.name}
          onChange={handleFolderChange}
          placeholder="Folder Name (e.g. HTML)"
          className="border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="category"
          value={newFolder.category}
          onChange={handleFolderChange}
          placeholder="Category (e.g. Frontend)"
          className="border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="logo"
          value={newFolder.logo}
          onChange={handleFolderChange}
          placeholder="Logo URL"
          className="border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          name="description"
          value={newFolder.description}
          onChange={handleFolderChange}
          placeholder="Description"
          className="sm:col-span-2 border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button
        onClick={handleAddFolder}
        className="mb-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
      >
        <Plus size={16} /> Add Folder
      </button>

      {/* Add File */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          name="url"
          value={newFile.url}
          onChange={handleFileChange}
          placeholder="Document/File URL"
          className="border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
        />
        <select
          name="folderName"
          value={newFile.folderName}
          onChange={handleFileChange}
          className="border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Folder</option>
          {folders.map((folder) => (
            <option key={folder._id} value={folder.name}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddFileToFolder}
        className="mb-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        <Plus size={16} /> Add File to Folder
      </button>

      {/* Folder Display */}
      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className="bg-white border border-purple-200 rounded-xl px-5 py-4 shadow-sm"
          >
            <div className="flex items-start gap-4">
              {folder.logo && (
                <img
                  src={folder.logo}
                  alt={folder.name}
                  className="w-12 h-12 object-contain rounded-md border border-gray-300"
                />
              )}
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-blue-900">{folder.name}</h4>
                    {folder.category && (
                      <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                        {folder.category}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteFolder(folder._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{folder.description}</p>

                {folder.files && folder.files.length > 0 && (
                  <>
                    <button
                      onClick={() => toggleFolderFiles(folder._id)}
                      className="text-sm text-purple-600 underline mb-2"
                    >
                      {openFolders[folder._id] ? "Hide Files" : "View All Files"}
                    </button>

                    {openFolders[folder._id] && (
                      <div className="flex flex-col gap-2">
                        {folder.files.map((file) => (
                          <div
                            key={file._id}
                            className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm"
                          >
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-purple-600 hover:underline"
                            >
                              <FileText size={14} />
                              View File
                            </a>
                            <button
                              onClick={() => handleDeleteFile(folder._id, file._id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <p className="text-xs text-gray-400 mt-1">
                  {folder.files?.length || 0} file(s)
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceManagement;
