import React, { useEffect, useState } from "react";
import { getAllCompaniesForStudent } from "../services/companyService";
import { getAllFolders } from "../services/resourceService";
import { Link } from "react-router-dom";

import {
  Building2,
  Bell,
  Gauge,
  User,
  CalendarDays,
  LogOut,
  Zap,
  X,
  Sun,
  Moon,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3 } from "lucide-react";


export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [visibleCompanies, setVisibleCompanies] = useState([]);
  const [resources, setResources] = useState([]);

  const [questions, setQuestions] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  const todayQuestion = questions.find((q) => {
    const postedDate = new Date(q.createdAt).toISOString().split("T")[0];
    return postedDate === today;
  });

  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/api/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      }
    };

    fetchAnnouncements();
  }, []);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("https://campus-prep-project.onrender.com/api/questions"); // Replace with your actual endpoint
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions", err);
      }
    };

    fetchQuestions();
  }, []);




  const [form, setForm] = useState({
    department: "",
    year: "",
    rollNumber: "",
    cgpa: "",
    phone: "",
    skills: "",
    bio: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name || "User");
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("https://campus-prep-project.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setForm({
          department: data.department || "",
          year: data.year || "",
          rollNumber: data.rollNumber || "",
          cgpa: data.cgpa || "",
          phone: data.phone || "",
          skills: data.skills ? data.skills.join(", ") : "",
          bio: data.bio || "",
        });
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();

    const fetchVisibleCompanies = async () => {
      try {
        const data = await getAllCompaniesForStudent();
        setVisibleCompanies(data);
      } catch (err) {
        console.error("Error fetching companies for dashboard:", err);
      }
    };

    fetchVisibleCompanies();

    const fetchResources = async () => {
      try {
        const res = await getAllFolders();
        setResources(res.data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };

    fetchResources();


  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  const filledFields = Object.values(form).filter(Boolean).length;
  const profileCompletion = Math.round((filledFields / 7) * 100);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again.");
        return;
      }

      const payload = {
        ...form,
        skills: form.skills.split(",").map((skill) => skill.trim()),
      };

      await axios.put("https://campus-prep-project.onrender.com/api/users/update-profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const stats = {
    Companies: visibleCompanies.length,
    Resources: resources.length,
    profileCompletion,
  };

  const recentUpdates = [
    {
      title: "Lumen Recruitment Drive Announced",  
      date: "15 May 2025",
    },
    {
      title: "Pre‑Placement Talk: Deolitte",
      date: "01 Jun 2025",
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fe] to-[#eef1ff] dark:from-gray-900 dark:to-gray-950 text-slate-800 dark:text-white">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 py-6 bg-white dark:bg-gray-800 shadow gap-4">
        <h1 className="text-xl font-bold text-purple-700 dark:text-purple-400">Dashboard</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded-lg transition hover:scale-105"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="p-4 sm:p-6 lg:p-10">
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
        >
          <div className="p-3 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-xl">
            <User size={28} />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-white mb-1">
              Welcome back, <span className="text-purple-600 dark:text-purple-400">{userName}</span>
            </h2>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            custom={1}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.03,
              transition: { type: "spring", stiffness: 300 },
            }}
            className="relative rounded-2xl p-5 bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-xl"
          >
            <p className="mb-1 text-sm font-medium">Companies</p>
            <h3 className="text-4xl font-bold">{stats.Companies}</h3>

            <div className="absolute top-3 right-3 bg-white/20 p-2 rounded-xl">
              <Building2 size={24} />
            </div>

            <button
              onClick={() => window.location.href = "/companiespage"}
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 rounded-xl py-1.5 px-3 transition"
            >
              <Zap size={14} />
              View All Companies
            </button>
          </motion.div>



          {/* Resources card with enhanced animation */}
          <motion.div
            custom={2}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: "easeOut" } }
            }}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative rounded-2xl p-5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg transition"
          >
            <p className="mb-1 text-sm font-medium">Resources</p>

            <h3 className="text-4xl font-bold">{stats.Resources}</h3>

            <div className="absolute top-3 right-3 bg-white/20 p-2 rounded-xl">
              <Bell size={24} />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/resources"}
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 rounded-xl py-1.5 px-3 transition"
            >
              <Zap size={14} />
              View All Resources
            </motion.button>
          </motion.div>



          <motion.div
            custom={3}
            variants={cardVariant}
            className="relative rounded-2xl p-5 bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg hover:scale-[1.02] transition"
          >
            <p className="mb-1 text-sm font-medium">Profile Completion</p>
            <h3 className="text-4xl font-bold mb-2">{profileCompletion}%</h3>
            <div className="w-full h-2 rounded-full bg-white/30 mb-3">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 rounded-xl py-1.5 px-3 transition"
            >
              <Zap size={14} />
              Update Profile
            </button>
            <div className="absolute top-3 right-3 bg-white/20 p-2 rounded-xl">
              <Gauge size={24} />
            </div>
          </motion.div>

        </div>

        {/* Upcoming + Recent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Coding Hub */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotate: -0.3 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl p-5 shadow-xl bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D] text-white hover:shadow-2xl hover:shadow-yellow-200/30 transition duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/20 text-white">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="text-base font-semibold">Coding Hub Questions</h4>
                <p className="text-xs text-white/70">Question posted by Admin today</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              {!todayQuestion ? (
                <p className="text-sm text-white/80">No question posted today.</p>
              ) : (
                <>
                  <Link to={`/questions/${todayQuestion._id}`}>
                    <p className="text-lg font-semibold text-white hover:underline">
                      {todayQuestion.title}
                    </p>
                  </Link>
                  <p className="text-sm text-white/90 mt-1">
                    {todayQuestion.description?.slice(0, 100)}
                  </p>
                  <p className="text-xs text-white/60 mt-2">
                    Posted on: {new Date(todayQuestion.createdAt).toDateString()}
                  </p>
                </>
              )}
            </div>
          </motion.div>


          {/* Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotate: -0.3 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl p-5 shadow-xl bg-gradient-to-br from-[#C084FC] to-[#F472B6] text-white hover:shadow-2xl hover:shadow-pink-200/30 transition duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/20 text-white">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="text-base font-semibold">Announcements</h4>
                <p className="text-xs text-white/90">Latest from Admin</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 space-y-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {announcements.length === 0 ? (
                <p className="text-sm text-white/80">No announcements yet.</p>
              ) : (
                announcements
                  .slice(-2)
                  .reverse()
                  .map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border-b border-white/20 pb-2 last:border-none last:pb-0"
                    >
                      {item.title && (
                        <h2 className="text-sm font-semibold text-white">{item.title}</h2>
                      )}
                      {item.message && (
                        <p className="text-sm text-white/90">{item.message}</p>
                      )}
                    </motion.div>
                  ))
              )}
            </div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotate: -0.3 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl p-5 shadow-xl bg-gradient-to-br from-[#2dd4bf] via-[#3b82f6] to-[#6366f1] text-white hover:shadow-2xl hover:shadow-blue-300/30 transition duration-300 ease-in-out"
          >
            {/* Icon + Heading */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/20 text-white">
                <BarChart3 size={20} />
              </div>
              <div>
                <h4 className="text-base font-semibold">Analytics</h4>
                <p className="text-xs text-white/80">
                  Access Previous Year Records & Reports
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => window.location.href = "/useranalytics"}
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl py-1.5 px-3 transition-all duration-200 ease-in-out"
            >
              <Zap size={14} />
              View Analytics
            </button>
          </motion.div>


        </div>
      </main>

      {/* Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto py-10 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-1">Update Your Profile</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
              Complete your profile to increase profile completion percentage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-sm font-medium">Department</label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select</option>
                  <option>CSE</option>
                  <option>ECE</option>
                  <option>AIML</option>
                  <option>AI</option>
                  <option>DS</option>
                  <option>AIDS</option>
                  <option>IT</option>
                  <option>CS IT</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Year</label>
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
            </div>

            <input
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600"
              placeholder="Roll Number e.g. CS21B001"
            />
            <input
              name="cgpa"
              value={form.cgpa}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600"
              placeholder="CGPA e.g. 8.5"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600"
              placeholder="Phone Number e.g. +91 9876543210"
            />
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600"
              placeholder="Skills (e.g. Python, React)"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600"
              placeholder="Brief Bio"
            />
            <button
              onClick={handleSave}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
