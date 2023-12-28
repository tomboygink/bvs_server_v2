import React, { FC, ChangeEvent, ReactNode } from "react";
import { TextField } from "@mui/material";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  inputprops: object;
  isError?: boolean;
  helperText?: ReactNode;
  handleChange: (event: ChangeEvent<HTMLElement | HTMLTextAreaElement>) => void;
  handleBlur?: (event: ChangeEvent<HTMLElement | HTMLTextAreaElement>) => void;
  value: string;
}

const Input: FC<Props> = ({
  name,
  label,
  required = true,
  inputprops,
  isError,
  helperText,
  handleChange,
  handleBlur,
  value,
}) => {
  return (
    <TextField
      name={name}
      sx={{ mt: "14px" }}
      InputLabelProps={{ style: { fontSize: 12 } }}
      variant="outlined"
      fullWidth
      required={required}
      size="small"
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      inputProps={inputprops}
      error={isError}
      helperText={helperText}
    />
  );
};

export default Input;
