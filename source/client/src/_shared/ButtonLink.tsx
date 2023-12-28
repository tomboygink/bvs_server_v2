import React, { FC } from "react";
import Button from "@mui/material/Button";

interface Props {
  onClick: () => void;
  value: string;
  sx?: object;
}
const _sx = { fontSize: "12px", p: "2px" };

const ButtonLink: FC<Props> = ({ onClick, value, sx = _sx }) => {
  return (
    <Button variant="text" onClick={onClick} sx={sx}>
      {value}
    </Button>
  );
};

export default ButtonLink;
