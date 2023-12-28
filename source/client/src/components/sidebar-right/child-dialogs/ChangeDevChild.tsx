import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AntSwitch } from "../../../assets/icons/icons";
import { openModal, closeModal } from "../../../utils/functions";
import { useForm } from "../../../hooks/useForm";
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

export default function ChangeDevChild() {
  const [open, setOpen] = useState(false);
  // const [values, setValues] = useState({});
  // const [errors, setErrors] = useState({});
  // const [isValid, setIsValid] = useState(false);
  // const [isValidInput, setIsValidInput] = useState({});
  const {
    values,
    handleChange,
    handleSelectChange,
    errors,
    isValidInput,
    isValid,
    resetForm,
  } = useForm("editDev");

  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const target = e.target;
  //   const name = target.name;
  //   const value = target.value;
  //   const form = target.closest("form");
  //   if (target instanceof HTMLInputElement && target.type === "checkbox") {
  //     setValues({ ...values, [name]: target.checked });
  //   } else {
  //     setValues({ ...values, [name]: value });
  //   }

  //   setErrors({ ...errors, [name]: target.validationMessage });
  //   setIsValid(form ? form.checkValidity() : false);
  // };

  // const handleBlur = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const target = e.target;
  //   const name = target.name;
  //   target.validationMessage
  //     ? setIsValidInput({ ...isValidInput, [name]: true })
  //     : setIsValidInput({ ...isValidInput, [name]: false });
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted...", values);
    isValid && resetForm();
    isValid && closeModal(setOpen);
  };

  return (
    <React.Fragment>
      <ButtonLink
        value="Редактировать устройство"
        onClick={() => openModal(setOpen)}
      ></ButtonLink>
      <Modal
        open={open}
        onClose={() => closeModal(setOpen)}
        title="Редактировать устройство"
        handleSubmit={handleSubmit}
        isValid={isValid}
        className="editDev"
      >
        <Input
          name="editDev_number"
          label="Номер устройства"
          inputprops={inputTextProps}
          value={
            "editDev_number" in values ? String(values.editDev_number) : ""
          }
          handleChange={handleChange}
          isError={
            "editDev_number" in isValidInput &&
            Boolean(isValidInput.editDev_number)
          }
          helperText={
            "editDev_number" in errors ? String(errors.editDev_number) : ""
          }
        />

        <Input
          name="editDev_name"
          label="Название устройства"
          inputprops={inputTextProps}
          value={"editDev_name" in values ? String(values.editDev_name) : ""}
          handleChange={handleChange}
          isError={
            "editDev_name" in isValidInput && Boolean(isValidInput.editDev_name)
          }
          helperText={
            "editDev_name" in errors ? String(errors.editDev_name) : ""
          }
        />

        <Input
          name="editDev_latitude"
          label="Широта"
          inputprops={inputNumberProps}
          value={
            "editDev_latitude" in values ? String(values.editDev_latitude) : ""
          }
          handleChange={handleChange}
          isError={
            "editDev_latitude" in isValidInput &&
            Boolean(isValidInput.editDev_latitude)
          }
          helperText={
            "editDev_latitude" in errors ? String(errors.editDev_latitude) : ""
          }
        />
        <Input
          name="editDev_longitude"
          label="Долгота"
          inputprops={inputNumberProps}
          value={
            "editDev_longitude" in values
              ? String(values.editDev_longitude)
              : ""
          }
          handleChange={handleChange}
          helperText={
            "editDev_longitude" in errors
              ? String(errors.editDev_longitude)
              : ""
          }
          isError={
            "editDev_longitude" in isValidInput &&
            Boolean(isValidInput.editDev_longitude)
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
          name="editDev_info"
          value={"editDev_info" in values ? String(values.editDev_info) : ""}
          onChange={handleChange}
          error={
            "editDev_info" in isValidInput && Boolean(isValidInput.editDev_info)
          }
          helperText={
            "editDev_info" in errors ? String(errors.editDev_info) : ""
          }
        />

        <FormGroup sx={{ mt: "12px" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ ml: "12px", fontSize: "12px", color: "#266bf1" }}>
              Заблокировать -{" "}
            </Typography>
            <AntSwitch name="editDev_block" onChange={handleChange} />
          </Stack>
        </FormGroup>

        <FormControl fullWidth size="small" sx={{ mt: "14px" }}>
          <InputLabel className="org" sx={{ fontSize: "12px" }}>
            Период сессии
          </InputLabel>

          <Select
            sx={{ fontSize: "12px" }}
            label="Период сессии"
            name="editDev_sess"
            value={"editDev_sess" in values ? values.editDev_sess : ""}
            onChange={handleSelectChange}
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
    </React.Fragment>
  );
}
