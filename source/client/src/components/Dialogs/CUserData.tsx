import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Checkbox,
  Divider,
  FormHelperText,
  ListItemIcon,
  MenuItem,
  TextField,
  TextareaAutosize,
  Typography
} from "@mui/material";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeUserData } from "../../store/userStore/UserStore";
import { userDataSchema } from "../../validations/CUserDataValid";

export default function CUserData() {
  const dispatch = useAppDispatch();

  const { data, code } = useAppSelector(state => state.userReducer); //// Значения из стора

  const [open, setOpen] = React.useState(false);

  const [surname, setSurname] = React.useState<string>(data[0].family);
  const [name, setName] = React.useState<string>(data[0].name);
  const [patronymic, setPatronymic] = React.useState<string>(data[0].father);
  const [email, setEmail] = React.useState<string>(data[0].email);
  const [phone, setPhone] = React.useState<string>(data[0].telephone);
  const [info, setInfo] = React.useState<string>(data[0].inf);
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
      surname: eventData.get("surname"),
      name: eventData.get("name"),
      patronymic: eventData.get("patronymic"),
      email: eventData.get("email"),
      phone: eventData.get("phone"),
      info: eventData.get("info")
    };
    await userDataSchema
      .validate(formData, { abortEarly: false })
      .then(responseData => {
        setCurrentErrors([]);
        dispatch(
          changeUserData(
            data[0].login,
            surname,
            name,
            patronymic,
            email,
            phone,
            info,
            code
          )
        );
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
        Настройки профиля
      </MenuItem>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Изменение данных</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                margin="normal"
                label="Фамилия"
                size="small"
                onChange={e => {
                  setSurname(e.target.value);
                }}
                value={surname || ""}
                name="surname"
              />

              <TextField
                sx={{ mr: "4px", ml: "4px" }}
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                margin="normal"
                label="Имя"
                autoFocus
                size="small"
                onChange={e => {
                  setName(e.target.value);
                }}
                value={name || ""}
                name="name"
              />

              <TextField
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                margin="normal"
                label="Отчество"
                autoComplete="отчество"
                autoFocus
                size="small"
                onChange={e => {
                  setPatronymic(e.target.value);
                }}
                value={patronymic || ""}
                name="patronymic"
              />
            </Box>

            <Box sx={{ display: "flex", justifyItems: "center" }}>
              <TextField
                sx={{ mt: "12px" }}
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                fullWidth
                required
                label="email"
                autoComplete="email"
                autoFocus
                size="small"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                value={email || ""}
                name="email"
              />
              <Checkbox
                sx={{ mt: "10px" }}
                checked={data[0].act_mail}
                id="myCheck"
                color="success"
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
            {data[0].act_mail ? (
              <FormHelperText sx={{ ml: "12px", color: "#318CE7" }}>
                почта подтверждена.
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ ml: "12px", color: "#FF6C37" }}>
                необходимо подтвердить почту!
              </FormHelperText>
            )}

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              fullWidth
              required
              label="Телефон"
              autoComplete="телефон"
              autoFocus
              size="small"
              onChange={e => {
                setPhone(e.target.value);
              }}
              value={phone}
              name="phone"
            />

            <FormHelperText sx={{ ml: "12px" }}>
              номер телефона должен содержать 10 символов.
            </FormHelperText>

            <Box>
              <Box
                className="wrapper"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 8fr",
                  gap: "8px",
                  alignItems: "center"
                }}
              ></Box>

              <Divider sx={{ padding: "12px" }} />
              <Typography sx={{ color: "#999999" }} variant="caption">
                Информация:
              </Typography>

              <TextareaAutosize
                className="info"
                aria-label="minimum height"
                minRows={4}
                style={{ width: "100%" }}
                onChange={e => {
                  setInfo(e.target.value);
                }}
                value={info || ""}
                name="info"
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
