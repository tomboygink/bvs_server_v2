import axios, { AxiosResponse } from "axios";
import $api from "../../http";

import {
  ApiRequest,
  IApiRequest,
  IApiResponse
} from "../../models/response/ApiResponse";

export default class userService {
  static get_UserByAuth(
    login: string,
    password: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("get_UserByAuth");
    q.args = { login, password };
    return $api.post<IApiResponse>("/api", { ...q });
  }

  static get_UserBySessionCode(
    code: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("get_UserBySessionCode");
    q.args = { code };
    return $api.post<IApiResponse>("/api", { ...q });
  }

  static set_CUserData(
    login: string,
    family: string,
    name: string,
    father: string,
    email: string,
    telephone: string,
    info: string,
    sess_id: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("set_CUserData");
    q.args = { login, family, name, father, email, telephone, info };
    q.sess_code = sess_id;
    return $api.post<IApiResponse>("/api", { ...q });
  }

  static set_ActMail(
    login: string,
    email: string,
    sess_id: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("set_ActMail");
    q.args = { login, email };
    q.sess_code = sess_id;
    return $api.post<IApiResponse>("/api", { ...q });
  }

  static set_ChangePass(
    login: string,
    old_password: string,
    new_password: string,
    repeat_password: string,
    sess_id: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("set_ChangePass");
    q.args = { login, old_password, new_password, repeat_password };
    q.sess_code = sess_id;
    return $api.post<IApiResponse>("/api", { ...q });
  }

  static onLogOut(sess_id: string): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("deleteCookie");
    q.args = { sess_id };
    return $api.post<IApiResponse>("/api", { ...q });
  }
}
