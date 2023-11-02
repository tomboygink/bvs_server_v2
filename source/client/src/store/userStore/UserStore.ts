import axios from "axios";
// import { loginSlice } from "../reducers/LoginnSlice";
import { AppDispatch } from "../store";
import UserService from "../services/UserCreator";
import { UserSlice } from "../reducers/UserSlice";
import { string } from "prop-types";

///////// Ф-я входа
export const SignIn =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(UserSlice.actions.loginFetching());

    try {
      console.log(login, password);
      const response = await UserService.get_UserByAuth(login, password);
      console.log(response.data, "response");
      dispatch(UserSlice.actions.loginFetchingSuccess(response.data));
    } catch (e: any) {
      dispatch(UserSlice.actions.loginFetchingError("Произошла ошибка"));
    }
  };

//////// Ф-я проверка пользователя по куки
export const checkAuth = (code: string) => async (dispatch: AppDispatch) => {
  dispatch(UserSlice.actions.checkAuthFetching());
  try {
    const response = await UserService.get_UserBySessionCode(code);
    dispatch(UserSlice.actions.checkAuthFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(UserSlice.actions.checkAuthFetchingError(e));
  }
};

///////// Ф-я изменения личных данных пользовалетя
export const changeUserData =
  (
    login: string,
    surname: string,
    name: string,
    patronymic: string,
    email: string,
    phone: string,
    info: string,
    code: string
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(UserSlice.actions.changeDataFetching());
    try {
      const act_mail = await UserService.set_ActMail(login, email, code);
      const response = await UserService.set_CUserData(
        login,
        surname,
        name,
        patronymic,
        email,
        phone,
        info,
        code
      );
      console.log(response, "response");
      console.log(act_mail, "act_mail");
      console.log(login, surname, name, patronymic, email, phone, info, code);
      dispatch(UserSlice.actions.changeDataFetchingSuccess(response.data));
    } catch (e) {
      dispatch(UserSlice.actions.changeDataFetchingError(e));
    }
  };

///////// Ф-я изменения пароля
export const changePass =
  (
    login: string,
    old_password: string,
    new_password: string,
    repeat_password: string,
    code: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.set_ChangePass(
        login,
        old_password,
        new_password,
        repeat_password,
        code
      );
      dispatch(UserSlice.actions.changePassFetchingSuccess(response.data));
    } catch (e) {
      dispatch(UserSlice.actions.changePassFetchingError(e));
    }
  };
