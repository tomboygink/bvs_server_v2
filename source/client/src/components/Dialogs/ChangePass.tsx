import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormHelperText,
  ListItemIcon,
  MenuItem,
  TextField
} from "@mui/material";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changePass, changeUserData } from "../../store/userStore/UserStore";
import { userDataSchema } from "../../validations/CUserDataValid";
import { changePassSchema } from "../../validations/ChangePassValid";

export default function ChangePass() {
  const dispatch = useAppDispatch();

  const { data, code } = useAppSelector(state => state.userReducer); //// Значения из стора

  const [open, setOpen] = React.useState(false);

  const [pass, setPass] = React.useState<string>("");
  const [new_pass, setNewPass] = React.useState<string>("");
  const [repeat_pass, setRepeatPass] = React.useState<string>("");
  const [currentErrors, setCurrentErrors] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const eventData = new FormData(event.currentTarget);

    let formData = {
      pass: eventData.get("pass"),
      new_pass: eventData.get("new_pass"),
      repeat_pass: eventData.get("repeat_pass")
    };

    await changePassSchema
      .validate(formData, { abortEarly: false })
      .then(responseData => {
        setCurrentErrors([]);
        dispatch(changePass(data[0].login, pass, new_pass, repeat_pass, code));
      })
      .catch(function (err) {
        err.inner.forEach((e: { message: any; path: any; value: any }) => {
          setCurrentErrors(["Ошибка! Данные не сохранены -" + e.message]);
        });
      });
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon className="list_item">
          <PermIdentityIcon fontSize="small" sx={{ color: "#007FFF" }} />
        </ListItemIcon>{" "}
        Изменить пароль
      </MenuItem>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Изменение пароля</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <TextField
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                margin="normal"
                label="Старый пароль"
                type="password"
                size="small"
                fullWidth
                onChange={e => {
                  setPass(e.target.value);
                }}
                value={pass || ""}
                name="pass"
              />

              <TextField
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                margin="normal"
                label="Старый пароль"
                type="password"
                fullWidth
                autoFocus
                size="small"
                onChange={e => {
                  setNewPass(e.target.value);
                }}
                value={new_pass || ""}
                name="new_pass"
              />

              <TextField
                sx={{ mr: "4px", ml: "4px" }}
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Старый пароль"
                autoFocus
                type="password"
                size="small"
                onChange={e => {
                  setRepeatPass(e.target.value);
                }}
                value={repeat_pass || ""}
                name="repeat_pass"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end"
              }}
            >
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  mt: "18px",
                  mb: "18px",
                  fontSize: "12px"
                }}
              >
                Сохранить
              </Button>
            </Box>
            {currentErrors.map(e => {
              return (
                <FormHelperText sx={{ ml: "12px", color: "red" }} key={e}>
                  {e}
                </FormHelperText>
              );
            })}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
