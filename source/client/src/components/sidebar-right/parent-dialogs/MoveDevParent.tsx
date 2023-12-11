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
import { AntSwitch } from "../../../assets/icons/icons";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MoveDevParent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{ fontSize: "12px", mt: "12px", textAlign: "left", p: "2px" }}
      >
        Переместить устройство
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          sx: {
            width: "100%",
            maxHeight: "100%"
          }
        }}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Переместить"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "red" }}>
            Закрыть
          </Button>
          <Button onClick={handleClose}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
