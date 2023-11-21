import React from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { DrawDevGroup } from "./DrawDevGroup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DevsGrSelectedSlice } from "../../store/reducers/DevsGrSelectedSlice";
import { FolderOpen } from "../../assets/icons/icons";

export const DevsGroupTree = (dgrs: any) => {
  const dispatch = useAppDispatch();

  const handleChange = async (event: any, node: any) => {
    if (node.includes("_dev_id_key_") === false) {
      dispatch(DevsGrSelectedSlice.actions.selectIdParent(node));
    }

    if (node.includes("_dev_id_key_") === true) {
      dispatch(DevsGrSelectedSlice.actions.selectIdChild(node));
    }
  };

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon sx={{ color: "#007FFF" }} />}
      defaultExpandIcon={<FolderOpen />}
      className="wrapper_treeviw"
      onNodeSelect={handleChange}
      sx={{ flexGrow: 1, maxWidth: 400, overflow: "auto", fontSize: "14px" }}
    >
      <DrawDevGroup props={...dgrs.props} />
    </TreeView>
  );
};
