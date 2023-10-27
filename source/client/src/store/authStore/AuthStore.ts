import axios from "axios";
// import { loginSlice } from "../reducers/LoginnSlice";
import { AppDispatch } from "../store";
import AuthService from "../services/AuthCreator";
import { loginSlice } from "../reducers/LoginnSlice";
import { string } from "prop-types";

export const SignIn =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loginSlice.actions.loginFetching());

    try {
      console.log(login, password);
      const response = await AuthService.get_UserByAuth(login, password);
      console.log(response.data, "response");
      dispatch(loginSlice.actions.loginFetchingSuccess(response.data));
    } catch (e: any) {
      dispatch(loginSlice.actions.loginFetchingError("Произошла ошибка"));
    }
  };

export const checkAuth = (code: string) => async (dispatch: AppDispatch) => {
  dispatch(loginSlice.actions.checkAuthFetching());
  try {
    const response = await AuthService.get_UserBySessionCode(code);
    dispatch(loginSlice.actions.checkAuthFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(loginSlice.actions.checkAuthFetchingError(e));
  }
};
