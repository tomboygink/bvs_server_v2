import axios, { AxiosResponse } from "axios";
import $api from "../../http";

import {
  ApiRequest,
  IApiRequest,
  IApiResponse
} from "../../models/response/ApiResponse";

export default class devsGrService {
  static get_DevsGroups(
    users_w: boolean,
    org_id: string,
    sess_id: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("get_DevsGroups");
    q.args = { users_w, org_id };
    q.sess_code = sess_id;
    return $api.post<IApiResponse>("/api", { ...q });
  }

  static get_DevFirstLastSessions(
    dev_number: string,
    sess_id: string
  ): Promise<AxiosResponse<IApiResponse>> {
    var q: IApiRequest = new ApiRequest("get_DevFirstLastSessions");
    q.args = { dev_number };
    q.sess_code = sess_id;
    return $api.post<IApiResponse>("/api", { ...q });
  }
}
