import axios from "axios";
import { loginSlice } from "../reducers/LoginnSlice";
import { AppDispatch } from "../store";
import AuthService from "../services/AuthCreator";

export const signIn =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loginSlice.actions.loginFetching());
    try {
      const response = await AuthService.login(login, password);
      dispatch(loginSlice.actions.loginFetchingSuccess(response.data));
      localStorage.setItem("sess_id", response.data.cmd);
    } catch (e: any) {
      dispatch(loginSlice.actions.loginFetchingError(e));
    }
  };
