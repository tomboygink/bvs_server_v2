import axios, { AxiosResponse } from "axios";

export const API_URL = process.env.API_URL;

const $api = axios.create({
  withCredentials: true, //// Для того,  чтобы к запросу куки цеплялись автоматически
  baseURL: API_URL
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("sess_id")}`;
  return config;
});
