import React, { FC } from "react";
import { TextField } from "@mui/material";

interface Props {
  label: string;
  autoComplete: string;
}

const Input: FC<Props> = ({ label, autoComplete }) => {
  return (
    <TextField
      sx={{ mt: "14px" }}
      inputProps={{ style: { fontSize: 12 } }}
      InputLabelProps={{ style: { fontSize: 12 } }}
      variant="outlined"
      fullWidth
      required
      autoFocus
      size="small"
      label={label}
      autoComplete={autoComplete}
    />
  );
};

export default Input;
