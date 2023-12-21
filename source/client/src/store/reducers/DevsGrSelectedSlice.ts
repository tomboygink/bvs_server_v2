import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../models/response/ApiResponse";
import { deleteAllCookies, setCookie } from "../browserCookes";
import {
  DEVICE,
  D_GROUP,
  SENSORS_LIST,
  TDGroup,
  TDevice,
} from "../../models/IDev";

export type gr = {
  id_devs: string;
  id_child: string;
  isActive: string;
  top_menu: string;
  selected_device: any[];
};
const initialState: gr = {
  id_devs: "",
  id_child: "",
  isActive: "",
  top_menu: "top_menu-1",
  selected_device: [],
};

export const DevsGrSelectedSlice = createSlice({
  name: "devsSelected",
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
    },
    selectDevice(state, action: PayloadAction<any[]>) {
      console.log(action.payload, "payload");
      state.selected_device = action.payload;
    },
  },
});

export default DevsGrSelectedSlice.reducer;
