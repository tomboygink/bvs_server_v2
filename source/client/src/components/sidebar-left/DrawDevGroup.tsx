import React from "react";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { TDGroup, TDevsGroup } from "../../models/IDev";
import { DrawDevItems } from "./DrawDevItems";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppDispatch } from "../../hooks/redux";
import { Box } from "@mui/material";

export const DrawDevGroup = (dgrs: any): React.ReactNode => {
  const dispatch = useAppDispatch();

  let devs = dgrs.props;
  let parent: React.ReactNode[] = new Array();
  let gr_array: TDGroup[] = new Array();
  for (var ii in devs) {
    let dgr: TDevsGroup = devs[ii];
    let gr: TDGroup = dgr.group;
    let gr_childs = dgr.childs;
    let gr_devs = dgr.devs;

    let childs: React.ReactNode[] = new Array();

    if (gr_childs.length > 0) {
      childs.push(<DrawDevGroup props={gr_childs} />);
    }

    if (gr_devs.length > 0) {
      for (var dii in gr_devs) childs.push(<DrawDevItems {...gr_devs[dii]} />);
    }

    gr_array.push(gr);

    parent.push(
      <React.Fragment key={"_gr_id_key_" + gr.id}>
        <Box sx={{ display: "flex" }}>
          <TreeItem
            nodeId={String(gr.id)}
            label={gr.g_name}
            sx={{
              color: "#434D5B",
              borderLeft: "1px solid #c1c1c1",
              fontSize: "14px",
              background: "#FDFDFE"
            }}
          >
            {childs}
          </TreeItem>
        </Box>
      </React.Fragment>
    );
  }

  return parent;
};
