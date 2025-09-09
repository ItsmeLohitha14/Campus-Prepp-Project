// services/userService.js
import axios from "axios";

export const getAllUsers = async () => {
  const response = await axios.get("/api/users/all");
  return response.data;
};

// Delete user by ID
export const deleteUser = async (userId) => {
  const response = await axios.delete(`/api/users/${userId}`);
  return response.data;
};