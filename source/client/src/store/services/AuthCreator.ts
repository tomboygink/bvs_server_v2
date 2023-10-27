import axios, { AxiosResponse } from "axios";
import { IUser } from "../../models/IUser";
import $api from "../../http";

export default class AuthService {
  static async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>("/login", { login, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>("/registration", { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
