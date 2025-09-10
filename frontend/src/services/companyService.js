// frontend/src/services/companyService.js
import axios from "axios";

const API = "https://campus-prep-project.onrender.com/api/admin";

// ADMIN: Add a company
export const addCompany = async (companyData, token) => {
  const res = await axios.post(`${API}/add-company`, companyData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ADMIN: Fetch companies for admin dashboard
export const fetchCompanies = async (token) => {
  const res = await axios.get(`${API}/companies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// STUDENT: Fetch all companies (same route, different role)
export const getAllCompaniesForStudent = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const res = await axios.get(`${API}/companies`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch companies for student", error);
    return [];
  }
};
