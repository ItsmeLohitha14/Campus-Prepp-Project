import axios from "axios";

const API = "https://campus-prep-project.onrender.com/api/resources";

export const getAllFolders = () => axios.get(`${API}/folders`);
export const addFolder = (folder) => axios.post(`${API}/add-folder`, folder);
export const addFileToFolder = (fileData) => axios.post(`${API}/add-file`, fileData);
export const deleteFolder = (id) => axios.delete(`${API}/folder/${id}`);
export const deleteFileFromFolder = (folderId, fileId) =>
  axios.delete(`${API}/folder/${folderId}/file/${fileId}`);
