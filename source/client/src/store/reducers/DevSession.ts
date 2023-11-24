import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../models/response/ApiResponse";

const initialState: IApiResponse = {
  cmd: "" /* команда запроса */,
  error: "" /* ошибка */,
  data: [] /* строки из запроса */,
  code: "" /* дополнительный код ответа */,
  isLoading: false,
  isAuth: false
};

export const DevSessionSlice = createSlice({
  name: "devSess",
  initialState,
  reducers: {
    getDevsSessFetching(state) {
      state.isLoading = true;
    },
    getDevsSessFetchingSuccess(state, action: PayloadAction<IApiResponse>) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.cmd = action.payload.cmd;
      state.code = action.payload.code;
    },
    getDevsSessFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default DevSessionSlice.reducer;
