import axios from 'axios';

const API_URL = 'https://campus-prep-project.onrender.com/api/announcements'; // Change to your backend URL

export const postAnnouncement = async (data) => {
  return await axios.post(API_URL, data);
};

export const getAnnouncements = async () => {
  return await axios.get(API_URL);
};
