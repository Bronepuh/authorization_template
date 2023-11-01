import axios from 'axios';
import qs from 'qs';

export const apiInstance = axios.create({
  headers: {
    app: ['web', 'mobile'],
    authorization: `Bearer ${localStorage.getItem('accessToken')}`
  },
  paramsSerializer: p => qs.stringify(p, {arrayFormat: 'repeat'})
});

apiInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.setAuthorization(`Bearer ${accessToken}`);  
  return config;
}, error => Promise.reject(error));
