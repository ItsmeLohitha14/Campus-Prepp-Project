import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const ADMIN_API = "http://localhost:5000/api/admin";

export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

export const login = async (userData, isAdmin = false) => {
  const url = isAdmin ? `${ADMIN_API}/login` : `${API_URL}/login`;
  const res = await axios.post(url, userData);
  return res.data;
};

export const getMe = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
