import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import devsReducer from "./reducers/DevsGrSlice";
import devSelectedReducer from "./reducers/DevsGrSelectedSlice";
import chartReducer from "./reducers/DevsChartSlice";
import DevSessionReduces from "./reducers/DevSession";
// import { userAPI } from "../services/UserService";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const rootReducer = combineReducers({
  userReducer,
  devsReducer,
  devSelectedReducer,
  chartReducer,
  DevSessionReduces,

  // [userAPI.reducerPath]: userAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    //   middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().concat(userAPI.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
