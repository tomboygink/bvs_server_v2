import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Divider,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { AntSwitch } from "../../../assets/icons/icons";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangeDevChild() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{ fontSize: "12px", mt: "12px", textAlign: "left", p: "2px" }}
      >
        Редактировать
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          sx: {
            width: "100%",
            maxHeight: "100%"
          }
        }}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Редактировать устройство"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              // error={APP_STORAGE.devs.getNumberError()}
              // helperText={APP_STORAGE.devs.getNumberError_mess()}
              variant="outlined"
              fullWidth
              required
              label="Номер устройства"
              autoComplete="Номер устройства"
              autoFocus
              size="small"
              // onChange={e => {
              //   APP_STORAGE.devs.setNumber(e.target.value);
              // }}
              //value={APP_STORAGE.devs.getNumber()}
            />

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              // error={APP_STORAGE.devs.getNumberError()}
              // helperText={APP_STORAGE.devs.getNumberError_mess()}
              variant="outlined"
              fullWidth
              required
              label="Название устройства"
              autoComplete="Название устройства"
              autoFocus
              size="small"
              // onChange={e => {
              //   APP_STORAGE.devs.setNumber(e.target.value);
              // }}
              //value={APP_STORAGE.devs.getNumber()}
            />

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              // error={APP_STORAGE.devs.getNumberError()}
              // helperText={APP_STORAGE.devs.getNumberError_mess()}
              variant="outlined"
              fullWidth
              required
              label="Долгота"
              autoComplete="Долгота"
              autoFocus
              size="small"
              // onChange={e => {
              //   APP_STORAGE.devs.setNumber(e.target.value);
              // }}
              //value={APP_STORAGE.devs.getNumber()}
            />

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              // error={APP_STORAGE.devs.getNumberError()}
              // helperText={APP_STORAGE.devs.getNumberError_mess()}
              variant="outlined"
              fullWidth
              required
              label="Широта"
              autoComplete="Широта"
              autoFocus
              size="small"
              // onChange={e => {
              //   APP_STORAGE.devs.setNumber(e.target.value);
              // }}
              //value={APP_STORAGE.devs.getNumber()}
            />

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              // error={APP_STORAGE.devs.getNumberError()}
              // helperText={APP_STORAGE.devs.getNumberError_mess()}
              variant="outlined"
              fullWidth
              required
              label="Информация"
              autoComplete="Информация"
              autoFocus
              size="small"
              // onChange={e => {
              //   APP_STORAGE.devs.setNumber(e.target.value);
              // }}
              //value={APP_STORAGE.devs.getNumber()}
            />

            <FormGroup sx={{ mt: "12px" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}
                >
                  Заблокировать -{" "}
                </Typography>
                <AntSwitch
                // checked={APP_STORAGE.devs.getCheckboxEd()}
                // onChange={editing => {
                //   this.ChekedForEdit(editing);
                // }}
                />
              </Stack>
            </FormGroup>

            <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
              <InputLabel className="org" sx={{ fontSize: "12px" }}>
                Период сессии
              </InputLabel>

              <Select
                // value={APP_STORAGE.devs.getPeriodSess()}
                sx={{ fontSize: "12px" }}
                label="Период сессии"
                // onChange={e => {
                //   this.SelectedPeriodSess(e.target.value);
                // }}
              >
                <MenuItem key="4_sess" sx={{ fontSize: "12px" }} value="1">
                  Один раз в день
                </MenuItem>
                <MenuItem key="3_sess" sx={{ fontSize: "12px" }} value="7">
                  Один раз в неделю
                </MenuItem>
                <MenuItem key="2_sess" sx={{ fontSize: "12px" }} value="14">
                  Каждые две недели
                </MenuItem>
                <MenuItem key="1_sess" sx={{ fontSize: "12px" }} value="31">
                  Один раз в месяц
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "red" }}>
            Закрыть
          </Button>
          <Button onClick={handleClose}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
