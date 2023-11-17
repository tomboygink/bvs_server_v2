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
    let gr: TDGroup = dgr.group;
    let gr_childs = dgr.childs;
    var gr_devs = dgr.devs;

    let childs: React.ReactNode[] = new Array();

    if (gr_childs.length > 0) {
      childs.push(<DevsChildCard props={gr_childs} />);
      parent.push(childs);
    }

    for (var key in gr_devs) {
      if ("_dev_id_key_" + gr_devs[key].id === id_child) {
        dispatch(getDevFirstLastSessions(gr_devs[key].number, code));

        parent.push(
          <>
            <Box
              key={"dev_child_id_" + gr_devs[key].id}
              sx={{
                pt: "14px",
                pl: "10%",
                pr: "10%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "bolder",
                  color: "#3c4043",
                  mb: "12px"
                }}
              >
                Данные по устройству
              </Typography>

              <Box sx={{ display: "flex", pt: "14px" }}>
                <ChartSession />

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
                      borderRadius: "4px",
                      width: "100%",
                      textAlign: "left",
                      p: "4px",
                      mt: "14px"
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

                  <Box sx={{ mt: "24px", p: "12px" }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", p: "8px" }}
                    >
                      <LimeUpIcon />
                      <Typography
                        sx={{ fontSize: "12px", color: "#9457EB", ml: "8px" }}
                      >
                        {" "}
                        Контрольная сессия - 11.08.2023 10:27
                      </Typography>
                      <script type="module" src=""></script>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: "8px"
                      }}
                    >
                      <LimeUpIcon />
                      <Typography
                        sx={{ fontSize: "12px", color: "#50C878", ml: "8px" }}
                      >
                        {" "}
                        Последняя сессия - 11.08.2023 10:27
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        );
      }
    }
  }

  return parent;
};
