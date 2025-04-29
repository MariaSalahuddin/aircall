
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://aircall-api.onrender.com',
});

export const getCalls = () => API.get('/activities');
export const getCallById = (id) => API.get(`/activities/${id}`);
export const archiveCall = (id) => API.patch(`/activities/${id}`, { is_archived: true });
export const unarchiveCall = (id) => API.patch(`/activities/${id}`, { is_archived: false });
