import React, {
  FC,
  ReactNode,
  forwardRef,
  ReactElement,
  Ref,
  FormEvent,
} from "react";
import {
  Dialog,
  Slide,
  IconButton,
  DialogTitle,
  DialogContent,
  Stack,
  Divider,
  DialogActions,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../Button";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface Props {
  open: boolean;
  onClose: () => void;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  title: string;
  children: ReactNode;
  isValid: boolean;
  type?: "button" | "submit" | "reset";
  className: string;
}

const Modal: FC<Props> = ({
  open,
  onClose,
  title,
  children,
  handleSubmit,
  isValid,
  type = "submit",
  className,
}) => {
  return (
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
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
          fontSize: "12px",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <form onSubmit={handleSubmit} className={className}>
          <Stack spacing={2} sx={{ pt: "12px" }}>
            {children}
          </Stack>
          <Divider sx={{ mt: "24px", mb: "12px" }} />
          <DialogActions>
            <Button
              disabled={!isValid}
              value="Сохранить"
              type={type}
              onClick={onClose}
            />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
