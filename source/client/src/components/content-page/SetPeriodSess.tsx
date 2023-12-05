import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setDevSess } from "../../store/authStore/DevSessionStore";
import TableSession from "./TableSession";

export const SetPeriodSess = (props: any) => {
  const [start, setPeriodStart] = React.useState("");
  const [end, setPeriodEnd] = React.useState("");
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        mt: "22px"
      }}
    >
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <TextField
            size="small"
            id="datetime-local"
            type="datetime-local"
            defaultValue={start || new Date().toISOString().substring(0, 16)}
            onChange={e => {
              setPeriodStart(e.target.value);
            }}
            sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
            InputLabelProps={{
              shrink: true
            }}
          />

          <TextField
            sx={{ fontSize: "12px!important", mr: "16px", mb: "8px" }}
            size="small"
            id="datetime-local"
            type="datetime-local"
            defaultValue={end || new Date().toISOString().substring(0, 16)}
            onChange={e => {
              setPeriodEnd(e.target.value);
            }}
            InputLabelProps={{
              shrink: true
            }}
          />

          <Button
            type="submit"
            variant="outlined"
            sx={{
              m: "8px",
              fontSize: "12px"
            }}
            onClick={() => {
              dispatch(setDevSess(props.number, start, end, props.code));
            }}
          >
            Установить период
          </Button>
        </Box>
      </Box>
      <TableSession />
    </Box>
  );
};
