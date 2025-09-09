import React, { useState, useEffect } from "react";
import {
  Building2,
  UserRound,
  BookOpen,
  Bell,
  LogOut,
  Sun,
  Moon,
  LayoutDashboard,
  Settings,
  BarChart2,
  ShieldCheck,
  FileText,
  Menu,
} from "lucide-react";
import CompanyManagement from "../components/CompanyManagement";
import StudentManagement from "../components/StudentManagement";
import ResourceManagement from "../components/ResourceManagement";
import AnnouncementManagement from "../components/AnnouncementManagement";
import AnalyticsPage from "./AnalyticsPage";
import CodingHub from "../components/CodingHub";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("companies");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
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
    localStorage.clear();
    window.location.href = "/";
  };

  const NavButton = ({ id, label, icon: Icon, color }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSidebarOpen(false);
      }}
      className={`w-full text-left px-4 py-2 rounded-lg font-medium flex items-center gap-3 transition ${activeTab === id
        ? `${color} text-white`
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "companies":
        return <CompanyManagement />;
      case "students":
        return <StudentManagement />;
      case "resources":
        return <ResourceManagement />;
      case "announcements":
        return <AnnouncementManagement />;
      case "analytics":
        return <AnalyticsPage />;
      case "coding-hub":
        return <CodingHub />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 bg-gray-100 dark:bg-gray-900 shadow-lg p-6 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          }`}
      >
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-10 flex items-center gap-2">
          <LayoutDashboard size={24} /> CampusPrep
        </div>

        <nav className="flex-1 space-y-2">
          <NavButton
            id="companies"
            label="Companies"
            icon={Building2}
            color="bg-purple-600"
          />
          <NavButton
            id="students"
            label="Students"
            icon={UserRound}
            color="bg-green-600"
          />
          <NavButton
            id="resources"
            label="Resources"
            icon={BookOpen}
            color="bg-blue-600"
          />
          <NavButton
            id="announcements"
            label="Announcements"
            icon={Bell}
            color="bg-orange-600"
          />
          <NavButton
            id="coding-hub"
            label="Coding Hub"
            icon={FileText}
            color="bg-yellow-600"
          />

          <hr className="my-4 border-gray-300 dark:border-gray-700" />

          <NavButton
            id="analytics"
            label="Analytics"
            icon={BarChart2}
            color="bg-indigo-600"
          />
          <NavButton
            id="permissions"
            label="Permissions"
            icon={ShieldCheck}
            color="bg-teal-600"
          />
          <NavButton
            id="settings"
            label="Settings"
            icon={Settings}
            color="bg-pink-600"
          />
        </nav>

        <div className="flex flex-col gap-3 pt-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center gap-2 py-2 px-4 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 py-2 px-4 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0 ml-0 sm:ml-72 h-screen">
        {/* Mobile topbar */}
        <header className="sm:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-900 shadow z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Desktop heading */}
        <header className="hidden sm:flex fixed top-0 left-72 right-0 items-center justify-center h-20 bg-gray-100 dark:bg-gray-900 z-20">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">
            Admin Dashboard
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 pt-16 sm:pt-20 bg-gray-100 dark:bg-gray-900 min-w-0">

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
