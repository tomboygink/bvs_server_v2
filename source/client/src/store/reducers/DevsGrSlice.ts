import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../models/response/ApiResponse";
import { deleteAllCookies, setCookie } from "../browserCookes";
import { DEVICE, D_GROUP, TDGroup, TDevice } from "../../models/IDev";

const initialState: IApiResponse = {
  cmd: "" /* команда запроса */,
  error: "" /* ошибка */,
  data: [] /* строки из запроса */,
  code: "" /* дополнительный код ответа */,
  isLoading: false,
  isAuth: false
};

const initState = DEVICE;

const gr: any = { data: [] };

export const DevsGrSlice = createSlice({
  name: "devs",
  initialState,
  reducers: {
    getDevsFetching(state) {
      state.isLoading = true;
    },
    getDevsFetchingSuccess(state, action: PayloadAction<IApiResponse>) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = action.payload.error;
      state.cmd = action.payload.cmd;
      state.code = action.payload.code;
    },
    getDevsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default DevsGrSlice.reducer;
