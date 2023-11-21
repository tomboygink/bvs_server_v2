import React from "react";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import LeakAddIcon from "@mui/icons-material/LeakAdd";

import { useAppSelector } from "../../hooks/redux";
import { TDGroup, TDevice, TDevsGroup } from "../../models/IDev";
import { Box } from "@mui/material";

export const DrawDevItems = (dev: TDevice) => {
  return (
    <React.Fragment key={"_dev_id_key_" + dev.id}>
      <Box sx={{ display: "flex" }}>
        <TreeItem
          nodeId={"_dev_id_key_" + dev.id}
          label={dev.number}
          sx={{ color: "#267FCA" }}
          // icon={<LeakAddIcon />}
        ></TreeItem>
      </Box>
    </React.Fragment>
  );
};
