import axios from 'axios';


export const api = axios.create({
  // baseURL: 'https://notehub-public.goit.study/api',

  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});
