import React from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Box, Paper, Typography } from "@mui/material";
import { TDGroup, TDevsGroup } from "../../models/IDev";
import { ChartSession } from "./ChartSession/ChartSession";
import TableSensors from "./TableSensors";
import { LimeUpIcon } from "../../assets/icons/icons";
import { getDevFirstLastSessions } from "../../store/authStore/DevsGrStore";
import { TopPanel } from "./TopMenu";

export const DevsChildCard = (dgrs: any): React.ReactNode => {
  const dispatch = useAppDispatch();
  const { id_child } = useAppSelector(state => state.devReducer);
  const { code } = useAppSelector(state => state.userReducer);

  let devs = dgrs.props;
  let parent: React.ReactNode[] = new Array();
  for (var ii in devs) {
    let dgr: TDevsGroup = devs[ii];
    var gr_devs = dgr.devs;
    let gr: TDGroup = dgr.group;
    let gr_childs = dgr.childs;
    var gr_devs = dgr.devs;
    let childs: React.ReactNode[] = new Array();

    if (gr_childs.length > 0) {
      childs.push(<DevsChildCard key={"chils_" + gr.id} props={gr_childs} />);

      parent.push(childs);
    }

    for (var key in gr_devs) {
      if ("_dev_id_key_" + gr_devs[key].id === id_child) {
        setTimeout(() => {
          dispatch(getDevFirstLastSessions(gr_devs[key].number, code));
        }, 1000);

        parent.push(
          <React.Fragment
            key={"dev_key_child" + gr_devs[key].id + gr_devs[key].number}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                height: "100%",
                flexWrap: "wrap"
              }}
            >
              <Box
                sx={{
                  border: "1px solid #318CE7",
                  borderRadius: "4px",
                  width: "100%",
                  textAlign: "left",
                  p: "4px",
                  mt: "14px",
                  maxHeight: "100px"
                }}
              >
                <Typography
                  sx={{ p: "4px", fontSize: "14px", fontWeight: "bold" }}
                >
                  Номер устройства - {gr_devs[key].number}
                </Typography>
                <Typography sx={{ p: "4px", fontSize: "14px" }}>
                  Долгота - {gr_devs[key].longitude}
                </Typography>
                <Typography sx={{ p: "4px", fontSize: "14px" }}>
                  Широта - {gr_devs[key].latitude}
                </Typography>
              </Box>
              <TableSensors props={gr_devs[key].sensors.s} />
            </Box>
          </React.Fragment>
        );
      }
    }
  }

  return parent;
};
