import React, { useState, FormEvent } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import _Button from "@mui/material/Button";
import { useForm } from "../../../hooks/useForm";
import { openModal, closeModal } from "../../../utils/functions";
import Input from "../../../_shared/Input/Input";
import Modal from "../../../_shared/Modal/Modal";
import ButtonLink from "../../../_shared/ButtonLink";

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
export default function AddDevChild() {
  const [open, setOpen] = useState(false);
  const [openSensor, setOpenSensor] = useState(false);

  const {
    values,
    handleChange,
    handleSelectChange,
    errors,
    isValidInput,
    isValid,
    resetForm,
  } = useForm("addDev");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted...=>", values);
    isValid && resetForm();
    isValid && closeModal(setOpen);
  };
  return (
    <>
      <ButtonLink
        value="Добавить устройство"
        onClick={() => openModal(setOpen)}
      ></ButtonLink>
      <Modal
        open={open}
        onClose={() => closeModal(setOpen)}
        title="Добавить устройство"
        handleSubmit={handleSubmit}
        isValid={isValid}
        className="addDev"
      >
        <Input
          name="addDev_number"
          label="Номер устройства"
          inputprops={inputTextProps}
          value={"addDev_number" in values ? String(values.addDev_number) : ""}
          handleChange={handleChange}
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
          value={"addDev_name" in values ? String(values.addDev_name) : ""}
          handleChange={handleChange}
          isError={
            "addDev_name" in isValidInput && Boolean(isValidInput.addDev_name)
          }
          helperText={"addDev_name" in errors ? String(errors.addDev_name) : ""}
        />
        <Input
          name="addDev_longitude"
          label="Широта"
          inputprops={inputNumberProps}
          value={
            "addDev_longitude" in values ? String(values.addDev_longitude) : ""
          }
          handleChange={handleChange}
          isError={
            "addDev_longitude" in isValidInput &&
            Boolean(isValidInput.addDev_longitude)
          }
          helperText={
            "addDev_longitude" in errors ? String(errors.addDev_longitude) : ""
          }
        />
        <Input
          name="addDev_latitude"
          label="Долгота"
          inputprops={inputNumberProps}
          value={
            "addDev_latitude" in values ? String(values.addDev_latitude) : ""
          }
          handleChange={handleChange}
          isError={
            "addDev_latitude" in isValidInput &&
            Boolean(isValidInput.addDev_latitude)
          }
          helperText={
            "addDev_latitude" in errors ? String(errors.addDev_latitude) : ""
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
          error={
            "addDev_info" in isValidInput && Boolean(isValidInput.addDev_info)
          }
          helperText={"addDev_info" in errors ? String(errors.addDev_info) : ""}
        />

        <ButtonLink
          value="Добавить сенсоры"
          onClick={() => openModal(setOpenSensor)}
          sx={{
            fontSize: "12px",
            mt: "12px",
            textAlign: "left",
            p: "2px",
            alignSelf: "flex-start",
          }}
        />
        <Modal
          open={openSensor}
          onClose={() => closeModal(setOpenSensor)}
          title="Введите глубину датчика"
          type="button"
          isValid
          className="addDev_sensors"
        >
          <Input
            inputprops={inputSensorProps}
            name="addDev_sensors"
            label="Глубина"
            value={
              "addDev_sensors" in values ? String(values.addDev_sensors) : ""
            }
            handleChange={handleChange}
            required={false}
          ></Input>
        </Modal>

        <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
          <InputLabel sx={{ fontSize: "12px" }}>Период сессии</InputLabel>
          <Select
            name="addDev_sess"
            value={"addDev_sess" in values ? values.addDev_sess : ""}
            onChange={handleSelectChange}
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
      </Modal>
    </>
  );
}
