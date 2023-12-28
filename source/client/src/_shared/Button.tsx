import React, { FC, FormEvent } from "react";
import _Button from "@mui/material/Button";
interface Props {
  onClick?: () => void;
  value: string;
  sx?: object;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const _sx = { fontSize: "12px", textAlign: "left", p: "10px" };
const Button: FC<Props> = ({
  onClick,
  value,
  sx = _sx,
  disabled = true,
  type = "button",
}) => {
  return (
    <_Button
      sx={sx}
      onClick={onClick}
      disabled={disabled}
      type={type}
      variant="contained"
    >
      {value}
    </_Button>
  );
};

export default Button;
