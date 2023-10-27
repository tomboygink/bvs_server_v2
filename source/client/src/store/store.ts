import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/LoginnSlice";
// import { userAPI } from "../services/UserService";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const rootReducer = combineReducers({
  loginReducer
  // [userAPI.reducerPath]: userAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
    //   middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().concat(userAPI.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
