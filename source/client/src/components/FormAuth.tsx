import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

import { SignIn } from "../store/authStore/AuthStore";
import { useState } from "react";

const defaultTheme = createTheme();

export const FormAuth = () => {
  const [log, setlogin] = useState<string>("");
  const [pass, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  // const { data } = useAppSelector(state => state.loginReducer);

  return (
    <Box>
      <TextField
        label="Введите email"
        onChange={e => setlogin(e.target.value)}
        value={log}
        variant="standard"
      />
      <TextField
        onChange={e => setPassword(e.target.value)}
        value={pass}
        label="Введите пароль"
        variant="standard"
      />

      <Button
        className="form-auth__button"
        fullWidth
        variant="outlined"
        sx={{ border: "none", background: "#F0F7FF" }}
        onClick={() => dispatch(SignIn(log, pass))}
      >
        Войти
      </Button>
    </Box>
  );
};
