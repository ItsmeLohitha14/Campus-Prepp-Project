import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Features from './components/Features';
import Companies from './components/Companies';
import Questions from './components/Questions';
import Updates from './components/Updates';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResourcesPage from './pages/ResourcesPage';
import PrivateRoute from './utils/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import CompaniesPage from "./pages/CompaniesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UserAnalyticsPage from './pages/UserAnalyticsPage';
import QuestionDetails from "./pages/QuestionDetails"; // ✅ Make sure this file exists

const App = () => {
  const location = useLocation();

  // ✅ Match dynamic routes like /questions/:id using startsWith
  const hideLayoutRoutes = [
    '/login',
    '/register',
    '/dashboard',
    '/resources',
    '/admin/dashboard',
    '/companiespage',
    '/analytics',
    '/useranalytics',
    '/questions/' // For dynamic question detail page
  ];

  const showLayout = !hideLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {showLayout && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Homepage />
              <Features />
              <Companies />
              <Questions />
              <Updates />
              <HeroSection />
            </>
          }
        />
        <Route path="/companies" element={<Companies />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/companiespage" element={<CompaniesPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/useranalytics" element={<UserAnalyticsPage />} />
        <Route path="/questions/:id" element={<QuestionDetails />} /> {/* ✅ Corrected */}
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <ResourcesPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />

      {showLayout && <Footer />}
    </>
  );
};

export default App;
