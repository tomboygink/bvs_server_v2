import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Divider, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AntSwitch } from "../../../assets/icons/icons";
import { openModal, closeModal } from "../../../utils/functions";
import Modal from "../../../_shared/Modal/Modal";
import ButtonLink from "../../../_shared/ButtonLink";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MoveDevChild() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log("Submited");
  };

  return (
    <React.Fragment>
      <ButtonLink
        value="Переместить устройство"
        onClick={() => openModal(setOpen)}
      />
      <Modal
        open={open}
        onClose={() => closeModal(setOpen)}
        title="Переместить устройство"
        handleSubmit={handleSubmit}
        isValid
        className="moveDev"
      >
        <TextField
          size="small"
          sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </Modal>
    </React.Fragment>
  );
}
