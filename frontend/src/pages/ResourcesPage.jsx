import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff, FileText } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const ResourceManagement = () => {
  const [folders, setFolders] = useState([]);
  const [showFiles, setShowFiles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await axios.get("/api/resources/folders");
        setFolders(res.data);
      } catch (err) {
        console.error("Error fetching folders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFolders();
  }, []);

  const toggleFiles = (folderId) => {
    setShowFiles((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 px-4 sm:px-6 py-10 text-gray-800 dark:text-white">
      {/* Back Button */}
      <div className="flex justify-start">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mb-10 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg 
            bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
            hover:scale-105 transform transition-all duration-300 ease-in-out 
            hover:shadow-purple-500/50 border border-transparent hover:border-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-12 tracking-tight">
        All Resources
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-gray-500 text-center col-span-full">Loading folders...</p>
        ) : folders.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No resources found.</p>
        ) : (
          folders.map((folder) => (
            <div
              key={folder._id}
              className="relative backdrop-blur-md bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-2xl transition duration-300 ease-in-out"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  {folder.logo && (
                    <img
                      src={folder.logo}
                      alt="folder-logo"
                      className="w-12 h-12 object-contain rounded-xl bg-white p-1 shadow"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-purple-700 flex items-center gap-2 flex-wrap">
                      {folder.name}
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        {folder.category}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{folder.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {folder.files?.length || 0}{" "}
                      {folder.files?.length === 1 ? "file" : "files"}
                    </p>
                  </div>
                </div>

                {/* Toggle Files Button */}
                <button
                  onClick={() => toggleFiles(folder._id)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition-all flex items-center"
                >
                  {showFiles[folder._id] ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" />
                      View Files
                    </>
                  )}
                </button>
              </div>

              {/* Files List */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showFiles[folder._id]
                    ? "max-h-96 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    : "max-h-0"
                }`}
              >
                {folder.files?.map((file, idx) => (
                  <div
                    key={file._id || idx}
                    className="flex items-center gap-2 text-sm text-blue-600 mb-2"
                  >
                    <FileText className="w-4 h-4 text-green-500" />
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline break-all"
                    >
                      {file.name || `View File ${idx + 1}`}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResourceManagement;
