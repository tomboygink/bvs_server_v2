import React, { useState } from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Box, Paper, Typography } from "@mui/material";
import { SENSORS_LIST, TDGroup, TDevsGroup } from "../../models/IDev";
import { ChartSession } from "./ChartSession/ChartSession";
import TableSensors from "./TableSensors";
import { LimeUpIcon } from "../../assets/icons/icons";
import {
  getDevFirstLastSessions,
  getDevice
} from "../../store/authStore/DevsGrStore";
import { TopPanel } from "./TopMenu";
import { SetPeriodSess } from "./SetPeriodSess";
import CriticalityTable from "./TableCriticality";
import TableSelectedSession from "./TableSelectedSession";
//ДОработать передачу данных

export const DevsChildCard = (dgrs: any): React.ReactNode => {
  const dispatch = useAppDispatch();
  const [device, setDevice] = useState({
    id: 0,
    group_dev_id: 0,
    number: "",
    name: "",
    latitude: "0.0",
    longitude: "0.0",
    sensors: SENSORS_LIST,
    info: "",
    time: "",
    deleted: false,
    period_sess: 0
  });

  const { id_child } = useAppSelector(state => state.devSelectedReducer);
  const { code } = useAppSelector(state => state.userReducer);
  const { top_menu } = useAppSelector(state => state.devSelectedReducer);

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
          dispatch(getDevice(gr_devs[key]));
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
              {top_menu === "top_menu-1" && (
                <TableSensors props={gr_devs[key].sensors.s} />
              )}
              {top_menu === "top_menu-2" && (
                <SetPeriodSess number={gr_devs[key].number} code={code} />
              )}
              {top_menu === "top_menu-3" && <CriticalityTable />}
              {top_menu === "top_menu-4" && <TableSelectedSession />}
            </Box>
          </React.Fragment>
        );
      }
    }
  }

  return parent;
};
