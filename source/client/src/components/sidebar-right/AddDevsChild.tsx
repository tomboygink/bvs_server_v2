import React from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Loading from "../Loading";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { EditIcon, ExelIcon, SchemeIcon } from "../../assets/icons/icons";
import ChangeDevChild from "./child-dialogs/ChangeDevChild";
import MoveDevChild from "./child-dialogs/MoveDevChild";
import SetDevChildPovs from "./child-dialogs/SetDevChildPovs";

export const AddDevsChild = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useAppSelector(state => state.devsReducer);

  return (
    <Box
      sx={{
        pt: "44px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mr: "14px"
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
        <ChangeDevChild />

        <MoveDevChild />

        <SetDevChildPovs />
        <Typography
          sx={{ fontSize: "12px", mt: "12px", textAlign: "left", p: "2px" }}
        >
          Установить контрольную сессию
        </Typography>
      </Box>

      <Box></Box>
    </Box>
  );
};
