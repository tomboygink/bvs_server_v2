import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../models/response/ApiResponse";
import { deleteAllCookies, setCookie } from "../browserCookes";
import { DEVICE, D_GROUP, TDGroup, TDevice } from "../../models/IDev";

export type gr = {
  id_devs: string;
  id_child: string;
  isActive: string;
  top_menu: string;
};
const initialState: gr = {
  id_devs: "",
  id_child: "",
  isActive: "",
  top_menu: ""
};

export const DevsGrSelectedSlice = createSlice({
  name: "dev",
  initialState,
  reducers: {
    selectIdParent(state, action: PayloadAction<any>) {
      state.id_devs = action.payload;
      state.isActive = "_dev_";
    },
    selectIdChild(state, action: PayloadAction<any>) {
      state.id_child = action.payload;
      state.isActive = "_child_";
    },
    selectItemTomMenu(state, action: PayloadAction<any>) {
      state.top_menu = action.payload;
    }
  }
});

export default DevsGrSelectedSlice.reducer;
