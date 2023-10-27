import axios, { AxiosResponse } from "axios";
import { getCookie } from "../store/browserCookes";

export const API_URL = `http://localhost:3040`;

const $api = axios.create({
  withCredentials: true, //// Для того,  чтобы к запросу куки цеплялись автоматически
  baseURL: API_URL
});

// $api.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${getCookie("sess_id")}`;
//   return config;
// });

export default $api;
