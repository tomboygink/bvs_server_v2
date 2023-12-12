import React, { useEffect } from "react";
import { AuthPage } from "./page/AuthPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkAuth } from "./store/userStore/UserStore";
import { deleteAllCookies, getCookie } from "./store/browserCookes";
import AppPage from "./page/AppPage";
import { Box } from "@mui/system";
import Loading from "./components/Loading";

export const App = () => {
  const { code, data, isLoading } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    if (getCookie("sess_id")) {
      dispatch(checkAuth(getCookie("sess_id")));
    }
  }, []);

  const dispatch = useAppDispatch();

  let ret_dt: React.ReactNode = <></>;

  if (data !== null && data.length > 0 && document.cookie !== "") {
    ret_dt = <AppPage />;
  } else if (data.length === 0 && document.cookie === "") {
    ret_dt = <AuthPage />;
  }

  return (
    <Box>
      {isLoading && <Loading />}
      {ret_dt}
    </Box>
  );
};
