// api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8095',
});

export const get = (featureName, resourceName, data, params = {}) => {
  const relativePath = `/api/1/${featureName}/${resourceName}`;
  const url = new URL(relativePath, axiosInstance.defaults.baseURL);
  url.search = new URLSearchParams(params).toString();

  return axiosInstance.get(url.toString(), data);
};

export const post = (featureName, resourceName, data, params = {}) => {
  const relativePath = `/api/1/${featureName}/${resourceName}`;
  const url = new URL(relativePath, axiosInstance.defaults.baseURL);
  url.search = new URLSearchParams(params).toString();
  return axiosInstance.post(url.toString(), data);
};


