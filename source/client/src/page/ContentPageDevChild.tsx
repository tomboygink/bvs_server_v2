import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { DevsChildCard } from "../components/content-page/DevsChildCard";
import { TopPanel } from "../components/content-page/TopMenu";
import { ChartSession } from "../components/content-page/ChartSession/ChartSession";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getDevsGr } from "../store/authStore/DevsGrStore";
import { MapLefter } from "../components/content-page/Map/Map";

export const ContentPageDevChild = () => {
  const { code, data } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  const data_devs = useAppSelector(state => state.devsReducer.data);
  let devs: any = data_devs;
  let devs_g;

  const users_w = true;
  useEffect(() => {
    dispatch(getDevsGr(users_w, data[0].org_id, code));
  }, []);

  if (devs.length > 0) {
    devs_g = JSON.parse(devs);
    return (
      <Box
        className="wrapper_dev"
        sx={{
          pt: "44px",
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

        <TopPanel />

        <Box sx={{ display: "flex", pt: "14px", width: "100%" }}>
          <DevsChildCard props={...devs_g.childs} />
          <ChartSession />
        </Box>
        <Box sx={{ height: "400px", width: "100%" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "bolder",
              color: "#3c4043",
              mt: "22px",
              mb: "24px",
              textAlign: "left"
            }}
          >
            Устройство на карте
          </Typography>
          <MapLefter />
        </Box>
      </Box>
    );
  }
};
