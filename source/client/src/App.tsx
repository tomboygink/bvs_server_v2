import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { AuthPage } from "./page/AuthPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkAuth } from "./store/authStore/AuthStore";
import { getCookie } from "./store/browserCookes";
import AppPage from "./page/AppPage";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Loading from "./components/Loading";

export const App = () => {
  const { code, data, isLoading } = useAppSelector(state => state.loginReducer);

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

  // if (APP_STORAGE.auth_form.getForgotPass() === true ) {
  //     ret_dt = <ForgotPass />
  // }

  return (
    <Box>
      {isLoading && <Loading />}
      {ret_dt}
    </Box>
  );
};
