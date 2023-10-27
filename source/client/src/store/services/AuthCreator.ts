import axios, { AxiosResponse } from "axios";
import $api from "../../http";
import {
  ApiRequest,
  IApiRequest,
  IApiResponse
} from "../../models/response/ApiResponse";

export default class AuthService {
  static get_UserByAuth(
    login: string,
    password: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("get_UserByAuth");
    q.args = { login, password };
    return $api.post<IApiResponse>("/api", { q });
  }

  static get_UserBySessionCode(
    code: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("get_UserBySessionCode");
    q.args = { code };
    return $api.post<IApiResponse>("/api", { q });
  }
}
