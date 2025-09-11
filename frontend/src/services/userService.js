// services/userService.js
import axios from "axios";

export const getAllUsers = async () => {
  const response = await axios.get("https://campus-prep-project.onrender.com/api/users/all");
  return response.data;
};

// Delete user by ID
export const deleteUser = async (userId) => {
  const response = await axios.delete(`https://campus-prep-project.onrender.com/api/users/${userId}`);
  return response.data;
};

