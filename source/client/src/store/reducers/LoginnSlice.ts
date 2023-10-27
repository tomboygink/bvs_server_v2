import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { initialState_IUser } from "../../models/response/AuthResponse";

const initialState = initialState_IUser;

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginFetching(state) {
      state.data.isLoading = true;
    },
    loginFetchingSuccess(state, action: PayloadAction<IUser>) {
      console.log(action.payload);
      state.data.isLoading = false;
      state.data.login = action.payload.data.login;
      state.data.password = action.payload.data.login;
      state.cmd = action.payload.cmd;
      state.code = action.payload.code;
    },
    loginFetchingError(state, action: PayloadAction<string>) {
      state.data.isLoading = false;
      state.error = action.payload;
    }
    // logoutFetching(state) {
    //   //   state.isLoading = false;
    //   //   state.error = "";
    //   //   state.user.email = "";
    //   //   state.user.id = "";
    //   //   state.isAuth = false;
    // }
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
    // checkAuthFetching(state) {
    //   state.isLoading = true;
    // },
    // checkAuthFetchingSuccess(state, action: PayloadAction<AuthResponse>) {
    //   state.isLoading = false;
    //   state.error = "";
    //   state.user = action.payload.user;
    //   state.isAuth = true;
    // },
    // checkAuthFetchingError(state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // }
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
