import React, { useState, FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
import { openModal, closeModal } from "../../../utils/functions";
import Input from "../../../_shared/Input/Input";
import Modal from "../../../_shared/Modal/Modal";
import ButtonLink from "../../../_shared/ButtonLink";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Stack, TextField } from "@mui/material";

export default function SetDevChildPovs() {
  const [open, setOpen] = useState(false);
  const {
    values,
    handleChange,
    handleSelectChange,
    errors,
    isValidInput,
    isValid,
    resetForm,
  } = useForm("setPovs");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submited...", values);
    isValid && resetForm();
  };
  return (
    <>
      <ButtonLink
        value="Поверочный интервал"
        onClick={() => openModal(setOpen)}
      />
      <Modal
        open={open}
        onClose={() => closeModal(setOpen)}
        title="Установить поверочный интервал"
        handleSubmit={handleSubmit}
        isValid={isValid}
        className="setPovs"
      >
        <Stack direction="row" spacing={2}>
          {/* <DateTimePicker
            views={["year", "month", "day"]}
            label="Controlled picker"
            onChange={(e) => console.log(e)}
          /> */}
          <TextField
            name="setPovs_in"
            size="small"
            type="datetime-local"
            sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={"setPovs_in" in values ? String(values.setPovs_in) : ""}
            onChange={handleChange}
            required
            error={
              "setPovs_in" in isValidInput && Boolean(isValidInput.setPovs_in)
            }
            helperText={"setPovs_in" in errors ? String(errors.setPovs_in) : ""}
          />
          <TextField
            name="setPovs_out"
            size="small"
            type="datetime-local"
            sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={"setPovs_out" in values ? String(values.setPovs_out) : ""}
            onChange={handleChange}
            required
            error={
              "setPovs_out" in isValidInput && Boolean(isValidInput.setPovs_out)
            }
            helperText={
              "setPovs_out" in errors ? String(errors.setPovs_out) : ""
            }
          />
        </Stack>
      </Modal>
    </>
  );
}
