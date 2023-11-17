import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../hooks/redux";


import { useState } from "react";
import { signIn } from "../store/authStore/UserStore";

const defaultTheme = createTheme();

export const FormAuth = () => {
  const [log, setlogin] = useState<string>("");
  const [pass, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976D2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Введите email"
          onChange={e => setlogin(e.target.value)}
          value={log}
          type="text"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={pass}
          label="Введите пароль"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => dispatch(signIn(log, pass))}
        >
          Войти
        </Button>
        <Grid item sx={{ display: "flex", justifyContent: "start" }}>
          <Link href="#" variant="body2">
            Забыли пароль?
          </Link>
        </Grid>
      </Box>
    </Container>
  );
};
