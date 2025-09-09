import React, { useEffect, useState } from "react";
import { UserRoundPlus, Search, Filter, RefreshCw } from "lucide-react";
import { getAllUsers, deleteUser } from "../services/userService";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // reset to page 1 when filters/search/students change
  }, [searchQuery, filterBranch, students]);


  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [students, searchQuery, filterBranch]);

  const fetchStudents = async () => {
    try {
      const raw = await getAllUsers();
      if (!Array.isArray(raw)) {
        console.error("Expected array but got:", raw);
        setStudents([]);
        return;
      }

      const keys = ["department", "year", "rollNumber", "cgpa", "phone", "skills", "bio"];
      const formatted = raw.map((u) => {
        const filled = keys.filter((k) => u[k] && (Array.isArray(u[k]) ? u[k].length > 0 : true)).length;

        return {
          _id: u._id,
          name: u.name,
          email: u.email,
          department: u.department || "-",
          rollNumber: u.rollNumber || "-",
          year: u.year || "-",
          phone: u.phone || "-",
          cgpa: u.cgpa || "-",
          skills: u.skills || "-",
          bio: u.bio || "-",
          completion: Math.round((filled / keys.length) * 100),
        };
      });

      setStudents(formatted);
      setFilteredStudents(formatted);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...students];

    if (searchQuery) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterBranch) {
      result = result.filter((s) => s.department === filterBranch);
    }

    setFilteredStudents(result);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user.");
    }
  };

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const badgeColor = (pct) =>
    pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500";

  const uniqueBranches = Array.from(new Set(students.map((s) => s.department))).filter(
    (d) => d && d !== "-"
  );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          <UserRoundPlus className="text-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white">Student Management</h3>
            <p className="text-sm text-black dark:text-gray-300">
              Monitor and manage student registrations
            </p>
          </div>
        </div>

        {/* Search and Filter Buttons */}
        <div className="flex flex-row flex-wrap justify-center md:justify-end gap-2 mt-4">
          <button
            onClick={() => {
              setShowSearch((prev) => !prev);
              setShowFilter(false);
            }}
            className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Search size={16} /> Search
          </button>
          <button
            onClick={() => {
              setShowFilter((prev) => !prev);
              setShowSearch(false);
            }}
            className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Filter size={16} /> Filter
          </button>

          <button
            onClick={() => {
              setSearchQuery("");
              setFilterBranch("");
              setShowSearch(false);
              setShowFilter(false);
            }}
            className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <RefreshCw size={16} /> Refresh
          </button>

        </div>

        {/* Search Input */}
        {showSearch && (
          <div className="mt-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name..."
              className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            />
          </div>
        )}

        {/* Filter Dropdown */}
        {showFilter && (
          <div className="mt-3">
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            >
              <option value="">All Branches</option>
              {uniqueBranches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-sm text-gray-500 py-10 text-center">Loading students…</p>
      ) : filteredStudents.length === 0 ? (
        <p className="text-sm text-gray-500 py-10 text-center">No matching students found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-black dark:bg-zinc-800 dark:text-white">
                <tr>
                  <th className="text-left px-4 py-2">Student</th>
                  <th className="text-left px-4 py-2">Branch</th>
                  <th className="text-left px-4 py-2">Profile Status</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-black dark:text-white bg-white dark:bg-zinc-900">
                {currentStudents.map((s) => (
                  <React.Fragment key={s._id}>
                    <tr className="border-t dark:border-zinc-700">
                      <td className="px-4 py-2">
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{s.email}</div>
                      </td>
                      <td className="px-4 py-2 font-medium">{s.department}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${badgeColor(s.completion)}`} />
                          {s.completion}%
                        </div>
                      </td>
                      <td className="px-4 py-2 flex items-center gap-2">
                        <button
                          onClick={() => toggleDetails(s._id)}
                          className="px-3 py-1 text-green-600 border border-green-500 rounded hover:bg-green-50 text-xs"
                        >
                          {showDetails[s._id] ? "Hide" : "View"}
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="px-3 py-1 text-red-600 border border-red-500 rounded hover:bg-red-50 text-xs"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                    {showDetails[s._id] && (
                      <tr className="border-t dark:border-zinc-700">
                        <td colSpan="4" className="px-4 py-3 text-sm text-black dark:text-white">
                          <p><strong>Roll No:</strong> {s.rollNumber}</p>
                          <p><strong>Year:</strong> {s.year}</p>
                          <p><strong>Phone:</strong> {s.phone}</p>
                          <p><strong>CGPA:</strong> {s.cgpa}</p>
                          <p><strong>Skills:</strong> {Array.isArray(s.skills) ? s.skills.join(", ") : s.skills}</p>
                          <p><strong>Bio:</strong> {s.bio}</p>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {currentStudents.map((s) => (
              <div
                key={s._id}
                className="border border-gray-200 dark:border-zinc-700 p-4 rounded-lg shadow-sm bg-white dark:bg-zinc-800"
              >
                <div className="font-semibold text-base text-black dark:text-white">{s.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{s.email}</div>
                <div className="text-sm text-black dark:text-gray-200"><strong>Branch:</strong> {s.department}</div>
                <div className="flex items-center text-sm mt-1 text-black dark:text-gray-200">
                  <span className={`w-2 h-2 rounded-full mr-2 ${badgeColor(s.completion)}`} />
                  <span>Profile Completion: {s.completion}%</span>
                </div>

                {showDetails[s._id] && (
                  <div className="text-sm mt-2 space-y-1 text-black dark:text-white">
                    <p><strong>Roll No:</strong> {s.rollNumber}</p>
                    <p><strong>Year:</strong> {s.year}</p>
                    <p><strong>Phone:</strong> {s.phone}</p>
                    <p><strong>CGPA:</strong> {s.cgpa}</p>
                    <p><strong>Skills:</strong> {Array.isArray(s.skills) ? s.skills.join(", ") : s.skills}</p>
                    <p><strong>Bio:</strong> {s.bio}</p>
                  </div>
                )}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleDetails(s._id)}
                    className="flex-1 py-1 text-green-600 border border-green-500 rounded hover:bg-green-50 text-xs"
                  >
                    {showDetails[s._id] ? "Hide" : "View"}
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="flex-1 py-1 text-red-600 border border-red-500 rounded hover:bg-red-50 text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6 text-sm text-black dark:text-white">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md ${currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
            >
              ← Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md ${currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
            >
              Next →
            </button>
          </div>

        </>
      )}
    </div>
  );
};

export default StudentManagement;
