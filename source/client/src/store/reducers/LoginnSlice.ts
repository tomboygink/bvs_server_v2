import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../models/response/ApiResponse";
import { setCookie } from "../browserCookes";

const initialState: IApiResponse = {
  cmd: "" /* команда запроса */,
  error: "" /* ошибка */,
  data: [] /* строки из запроса */,
  code: "" /* дополнительный код ответа */,
  isLoading: false,
  isAuth: false
};

export const loginSlice = createSlice({
  name: "login",
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
    // logoutFetching(state) {
    //   //   state.isLoading = false;
    //   //   state.error = "";
    //   //   state.user.email = "";
    //   //   state.user.id = "";
    //   //   state.isAuth = false;
    // },
    // regFetching(state) {
    //   state.isLoading = true;
    // },
    // regFetchingSuccess(state, action: PayloadAction<AuthResponse>) {
    //   state.isLoading = false;
    //   state.error = "";
    //   state.user = action.payload.user;
    // },
    // reqFetchingError(state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
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

  ///////////////////////////////////// extraReducer
  // extraReducers: {
  //   [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
  //     state.isLoading = false;
  //     state.error = "";
  //     state.users = action.payload;
  //   },
  //   [fetchUsers.pending.type]: state => {
  //     state.isLoading = true;
  //   },
  //   [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   }
  // }
});

export default loginSlice.reducer;
