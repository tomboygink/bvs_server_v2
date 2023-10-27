import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { AuthPage } from "./page/AuthPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkAuth } from "./store/authStore/AuthStore";
import { getCookie } from "./store/browserCookes";
import AppPage from "./page/AppPage";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const App = () => {
  const { code, isLoading } = useAppSelector(state => state.loginReducer);

  useEffect(() => {
    if (getCookie("sess_id")) {
      dispatch(checkAuth(getCookie("sess_id")));
    }
  }, []);

  const dispatch = useAppDispatch();
  return (
    <Box>
      {isLoading && <Typography>Загрузка....</Typography>}
      {code === null ? <AuthPage /> : <AppPage />}
    </Box>
  );
};
