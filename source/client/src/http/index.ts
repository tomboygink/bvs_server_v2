import axios, { AxiosResponse } from "axios";
import { getCookie } from "../store/browserCookes";
import config from "../../../config.json";

const $api = axios.create({
  withCredentials: true //// Для того,  чтобы к запросу куки цеплялись автоматически
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getCookie("sess_id")}`;
  return config;
});

export default $api;
