import axios from 'axios';

const API_URL = 'http://localhost:5000/api/announcements'; // Change to your backend URL

export const postAnnouncement = async (data) => {
  return await axios.post(API_URL, data);
};

export const getAnnouncements = async () => {
  return await axios.get(API_URL);
};
