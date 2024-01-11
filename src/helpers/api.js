// api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8095/api/1',
});

export const get = (featureName, resourceName) => {
  return axiosInstance.get(`/${featureName}/${resourceName}`);
};

export const post = (featureName, resourceName, data) => {
    return axiosInstance.post(`/${featureName}/${resourceName}`, data);
  }

