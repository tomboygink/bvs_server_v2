import { AppDispatch } from "../store";
import UserService from "../services/UserCreator";
import { UserSlice } from "../reducers/UserSlice";

export const signIn =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(UserSlice.actions.loginFetching());

    try {
      console.log(login, password);
      const response = await UserService.get_UserByAuth(login, password);
      dispatch(UserSlice.actions.loginFetchingSuccess(response.data));
    } catch (e: any) {
      dispatch(UserSlice.actions.loginFetchingError("Произошла ошибка"));
    }
  };

export const checkAuth = (code: string) => async (dispatch: AppDispatch) => {
  dispatch(UserSlice.actions.checkAuthFetching());
  try {
    const response = await UserService.get_UserBySessionCode(code);
    dispatch(UserSlice.actions.checkAuthFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(UserSlice.actions.checkAuthFetchingError(e));
  }
};

export const onLogOut = (code: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await UserService.onLogOut(code).then(response => {
      dispatch(UserSlice.actions.logoutFetching());
    });
  } catch (e: any) {}
};
