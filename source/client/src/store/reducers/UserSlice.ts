import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../models/response/ApiResponse";
import { deleteAllCookies, setCookie } from "../browserCookes";

const initialState: IApiResponse = {
  cmd: "" /* команда запроса */,
  error: "" /* ошибка */,
  data: [] /* строки из запроса */,
  code: "" /* дополнительный код ответа */,
  isLoading: false,
  isAuth: false
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginFetching(state) {
      state.isLoading = true;
      state.isAuth = false;
    },
    loginFetchingSuccess(state, action: PayloadAction<IApiResponse>) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.cmd = action.payload.cmd;
      state.code = action.payload.code;
      setCookie("sess_id", action.payload.code);
    },
    loginFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeDataFetching(state) {
      state.isLoading = true;
    },
    changeDataFetchingSuccess(state, action: PayloadAction<IApiResponse>) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.cmd = action.payload.cmd;
      state.code = action.payload.code;
    },
    changeDataFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changePassFetchingSuccess(state, action: PayloadAction<IApiResponse>) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.cmd = action.payload.cmd;
      state.code = action.payload.code;
    },
    changePassFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutFetching(state) {
      deleteAllCookies();
      state.isLoading = false;
      state.data = [];
      state.error = "";
      state.cmd = "";
      state.code = "";
    },

    checkAuthFetching(state) {
      state.isLoading = true;
      state.isAuth = false;
    },
    checkAuthFetchingSuccess(state, action: PayloadAction<IApiResponse>) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.cmd = action.payload.cmd;

      state.code = action.payload.code;
    },
    checkAuthFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default UserSlice.reducer;
