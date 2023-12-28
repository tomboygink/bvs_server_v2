import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppPanel from "../components/AppPanel";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getDevsGr } from "../store/authStore/DevsGrStore";
import { DevsGroupTree } from "../components/sidebar-left/DevsGroupTree";
import { Box } from "@mui/system";
import Loading from "../components/Loading";
import { DevsCard } from "../components/content-page/DevsCard";
import { DevsChildCard } from "../components/content-page/DevsChildCard";
import { AddDevs } from "../components/sidebar-right/AddDevs";
import { AddDevsChild } from "../components/sidebar-right/AddDevsChild";
import { ContentPageDevChild } from "./ContentPageDevChild";
import { ContentPageDev } from "./ContentPageDev";
import { Typography } from "@mui/material";
// import { devsAPI } from "../store/services/DevsApi";

function AppPage() {
  const dispatch = useAppDispatch();
  const { code, data } = useAppSelector((state) => state.userReducer);
  const { isLoading } = useAppSelector((state) => state.devsReducer);
  const { isActive } = useAppSelector((state) => state.devSelectedReducer);

  const data_devs = useAppSelector((state) => state.devsReducer.data);
  // const { data: devs_api } = devsAPI.useFetchAllDevsQuery("");

  // console.log("devs_api=>", devs_api);
  // console.log("data_devs=>", data_devs);
  // console.log(Array.isArray(data_devs));

  let devs: any = data_devs;
  // let devs: any = devs_api;
  let devs_g;

  const users_w = true;
  useEffect(() => {
    dispatch(getDevsGr(users_w, data[0].org_id, code));
  }, []);

  if (devs.length > 0) {
    devs_g = JSON.parse(devs);

    return (
      <Box className="wrapper-page">
        <main className="main">
          <div className="col-12">
            {" "}
            <AppPanel />
          </div>
          <div className="main-content">
            <div className="wrapper">
              <div className="row">
                <aside className="col-3 sidebar-left">
                  {/* <DevsGroupTree props={...devs_g.childs} /> */}
                  <DevsGroupTree props={{ ...devs_g.childs }} />
                </aside>
                <div className="col-8 content-page">
                  {isActive === "_dev_" && <ContentPageDev />}
                  {isActive === "_child_" && <ContentPageDevChild />}
                  {isActive === "" && (
                    <Typography> Ничего не выбрано</Typography>
                  )}
                </div>
                {/* <AddDevs /> */}
                <aside className="col-1 sidebar-right">
                  <AddDevsChild />
                </aside>
              </div>
            </div>
          </div>
        </main>
      </Box>
    );
  } else {
    return <Loading />;
  }
}

export default AppPage;
