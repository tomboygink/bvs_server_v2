import React, { useState, forwardRef, ReactElement, Ref } from "react";
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
const AddDevInputsData = [
  {
    label: "Номер устройства",
    autoComplete: "Номер устройства",
  },
  {
    label: "Название устройства",
    autoComplete: "Название устройства",
  },
  {
    label: "Долгота",
    autoComplete: "Долгота",
  },
  {
    label: "Широта",
    autoComplete: "Широта",
  },
];
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

  const handleSubmit = () => {
    console.log("Отправка данных");
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
          <Stack spacing={2} sx={{ pt: "12px" }}>
            {AddDevInputsData.map((input, i) => {
              return (
                <Input
                  key={i}
                  label={input.label}
                  autoComplete={input.autoComplete}
                />
              );
            })}

            <TextField
              sx={{ mt: "14px" }}
              inputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              variant="outlined"
              fullWidth
              required
              label="Информация"
              autoComplete="Информация"
              autoFocus
              size="small"
              multiline
              minRows={4}
              maxRows={6}
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
                <Input label="Глубина" autoComplete="Глубина"></Input>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => closeModal(setOpenSensor)}
                  sx={{ color: "red" }}
                >
                  Закрыть
                </Button>
                <Button onClick={handleSubmit}>Сохранить</Button>
              </DialogActions>
            </Dialog>

            <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
              <InputLabel sx={{ fontSize: "12px" }}>Период сессии</InputLabel>
              <Select sx={{ fontSize: "12px" }} label="Период сессии">
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
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => closeModal(setOpen)} sx={{ color: "red" }}>
            Закрыть
          </Button>
          <Button onClick={handleSubmit}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
