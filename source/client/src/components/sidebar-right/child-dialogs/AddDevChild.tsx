import React, {
  useState,
  forwardRef,
  ReactElement,
  Ref,
  ChangeEvent,
  FormEvent,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { openModal, closeModal } from "../../../utils/functions";
import Input from "../../../_shared/Input/Input";

const inputTextProps = {
  style: { fontSize: 12 },
};

const inputNumberProps = {
  style: { fontSize: 12 },
  type: "number",
  inputMode: "decimal",
  step: 0.000001,
};

const inputSensorProps = {
  style: { fontSize: 12 },
  type: "number",
  inputMode: "decimal",
  step: 0.1,
};
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddDevChild() {
  const [open, setOpen] = useState(false);
  const [openSensor, setOpenSensor] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isValidInput, setIsValidInput] = useState({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const form = target.closest("form");
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    if (!openSensor) {
      setIsValid(form ? form.checkValidity() : false);
    }
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;
    target.validationMessage
      ? setIsValidInput({ ...isValidInput, [name]: true })
      : setIsValidInput({ ...isValidInput, [name]: false });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted...=>", values);
    isValid && closeModal(setOpen);
  };
  return (
    <>
      <Button
        variant="text"
        onClick={() => openModal(setOpen)}
        sx={{ fontSize: "12px", mt: "12px", textAlign: "left", p: "2px" }}
      >
        Добавить устройство
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          sx: {
            width: "100%",
            maxHeight: "100%",
          },
        }}
        onClose={() => closeModal(setOpen)}
      >
        <DialogTitle>Добавить устройство</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ pt: "12px" }}>
              <Input
                name="addDev_number"
                label="Номер устройства"
                inputprops={inputTextProps}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isError={
                  "addDev_number" in isValidInput &&
                  Boolean(isValidInput.addDev_number)
                }
                helperText={
                  "addDev_number" in errors ? String(errors.addDev_number) : ""
                }
              />
              <Input
                name="addDev_name"
                label="Название устройства"
                inputprops={inputTextProps}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isError={
                  "addDev_name" in isValidInput &&
                  Boolean(isValidInput.addDev_name)
                }
                helperText={
                  "addDev_name" in errors ? String(errors.addDev_name) : ""
                }
              />
              <Input
                name="addDev_longitude"
                label="Широта"
                inputprops={inputNumberProps}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isError={
                  "addDev_longitude" in isValidInput &&
                  Boolean(isValidInput.addDev_longitude)
                }
                helperText={
                  "addDev_longitude" in errors
                    ? String(errors.addDev_longitude)
                    : ""
                }
              />
              <Input
                name="addDev_latitude"
                label="Долгота"
                inputprops={inputNumberProps}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isError={
                  "addDev_latitude" in isValidInput &&
                  Boolean(isValidInput.addDev_latitude)
                }
                helperText={
                  "addDev_latitude" in errors
                    ? String(errors.addDev_latitude)
                    : ""
                }
              />
              <TextField
                sx={{ mt: "14px" }}
                inputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant="outlined"
                fullWidth
                label="Информация"
                size="small"
                multiline
                minRows={4}
                maxRows={6}
                name="addDev_info"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  "addDev_info" in isValidInput &&
                  Boolean(isValidInput.addDev_info)
                }
                helperText={
                  "addDev_info" in errors ? String(errors.addDev_info) : ""
                }
              />
              <Button
                variant="text"
                onClick={() => openModal(setOpenSensor)}
                sx={{
                  fontSize: "12px",
                  mt: "12px",
                  textAlign: "left",
                  p: "2px",
                  alignSelf: "flex-start",
                }}
              >
                Добавить сенсоры
              </Button>
              <Dialog
                open={openSensor}
                TransitionComponent={Transition}
                keepMounted
                PaperProps={{
                  sx: {
                    width: "100%",
                    maxHeight: "100%",
                  },
                }}
                onClose={() => closeModal(setOpenSensor)}
              >
                <DialogTitle>Введите глубину датчика</DialogTitle>
                <DialogContent>
                  <Input
                    inputprops={inputSensorProps}
                    name="addDev_sensors"
                    label="Глубина"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    required={false}
                  ></Input>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => closeModal(setOpenSensor)}>
                    Сохранить и закрыть
                  </Button>
                </DialogActions>
              </Dialog>

              <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
                <InputLabel sx={{ fontSize: "12px" }}>Период сессии</InputLabel>
                <Select
                  name="addDev_sess"
                  value={"addDev_sess" in values ? values.addDev_sess : ""}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  sx={{ fontSize: "12px" }}
                  label="Период сессии"
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
            </Stack>
            <Divider />
            <DialogActions>
              <Button onClick={() => closeModal(setOpen)} sx={{ color: "red" }}>
                Закрыть
              </Button>
              <Button disabled={!isValid} type="submit">
                Сохранить
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
