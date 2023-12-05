import React from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import { TDGroup, TDevsGroup } from "../../models/IDev";
import MapStations from "./Map/MapStations";

export const DevsCard = (dgrs: any): React.ReactNode => {
  const dispatch = useAppDispatch();
  const { id_devs } = useAppSelector(state => state.devSelectedReducer);

  let devs = dgrs.props;
  let parent: React.ReactNode[] = new Array();
  for (var ii in devs) {
    let dgr: TDevsGroup = devs[ii];
    let gr: TDGroup = dgr.group;
    let gr_childs = dgr.childs;

    let childs: React.ReactNode[] = new Array();

    if (gr_childs.length > 0) {
      childs.push(
        <DevsCard key={"_card__id_key_" + gr.id} props={gr_childs} />
      );
    }

    /////////////////////////////////////////////////////////////////////////////// Если есть дочерние строки
    parent.push(
      <React.Fragment key={"_card__id_key_" + gr.id}>
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
          <Box id={String(gr.id)}>{childs}</Box>
        </Box>
      </React.Fragment>
    );

    if (String(id_devs) === String(gr.id)) {
      parent.push(
        <React.Fragment key={"_card_id_key_" + gr.id}>
          <Box
            sx={{
              border: "1px solid #318CE7",
              borderRadius: "4px",
              width: "100%",
              textAlign: "left",
              p: "4px",
              mt: "14px"
            }}
          >
            <Typography sx={{ p: "4px", fontSize: "14px" }}>
              Место расположения - {gr.g_name}
            </Typography>
            <Typography sx={{ p: "4px", fontSize: "14px" }}>
              Долгота - {gr.latitude}
            </Typography>
            <Typography sx={{ p: "4px", fontSize: "14px" }}>
              Широта - {gr.latitude}
            </Typography>
          </Box>
          {/* <Box
              sx={{
                height: "300px",
                width: "100%",
                borderRadius: "8px",
                mt: "54px"
              }}
            >
              {/* <MapStations /> */}
          {/* </Box> */}
        </React.Fragment>
      );
    }
  }

  return parent;
};
