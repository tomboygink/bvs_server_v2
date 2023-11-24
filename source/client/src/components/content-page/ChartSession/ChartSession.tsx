import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { WellIcon } from "../../../assets/icons/icons";
import { Box } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";

export const ChartSession = () => {
  const { firstLastSess, firstSess, lastSess, selectedSess } = useAppSelector(
    state => state.chartReducer
  );

  console.log(selectedSess, "selectedSess");
  const customizedGroupTick = (props: any) => {
    const { index, x, y, payload } = props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          className="map"
          width="4"
          height="8"
          fill="#808080"
          fontFamily="Verdana"
          fontSize="14px"
        />
        <text
          dx={x - 35}
          dy={y + 10}
          fill="808080"
          fontSize="12px"
          textAnchor="middle"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  if (firstLastSess.length) {
    let tick_yaxis = [];
    let tick_xaxis = [];
    let mintick_y = null;
    let maxtick_y = null;
    let filtered = [];

    let mintick_x = null;
    let maxtick_x = null;

    for (var i in firstLastSess) {
      tick_yaxis.push(firstLastSess[i].depth);

      tick_xaxis.push(firstLastSess[i].data_f, firstLastSess.data_s);
    }

    if (tick_yaxis.length) {
      maxtick_y = tick_yaxis[tick_yaxis.length - 1];
      mintick_y = tick_yaxis[0];
    }

    if (tick_xaxis.sort().length) {
      filtered = tick_xaxis.sort().filter(function (x) {
        return x !== undefined;
      });
      maxtick_x = filtered[filtered.sort().length - 1];
      mintick_x = filtered.sort()[0];
    }

    let uniqueChars: number[] = [];
    filtered.sort().forEach(element => {
      if (!uniqueChars.includes(element)) {
        uniqueChars.push(element);
      }
    });

    if (maxtick_y !== null && mintick_y !== null) {
      return (
        <Box className="container_charts">
          <WellIcon />

          {/* < Box className="item-3" /> */}

          <ResponsiveContainer className="item-2" width="100%">
            <LineChart
              layout="vertical"
              data={firstLastSess}
              // margin={{
              //   top: 20,
              //   right: 20,
              //   left: 20,
              //   bottom: 5,
              // }}
            >
              <XAxis
                type="number"
                strokeWidth={"0.1mm"}
                stroke="rgb(255 255 255 / 0%)"
                tickCount={27}
                tick={{ fill: "#007FFF", fontSize: "12px" }}
                domain={[-15, 15]}
              />
              <YAxis
                ticks={tick_yaxis}
                interval={0}
                domain={[Number(mintick_y), Number(maxtick_y)]}
                dataKey="depth"
                type="number"
                strokeWidth={"0.1mm"}
                stroke="#ff000000"
                tick={customizedGroupTick}
                className="yAxis"
              />
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <ReferenceLine y={0} stroke="#8B4513" strokeDasharray="4 4" />
              {/*
            // <ReferenceLine className="y7676" x="-15" stroke="red" /> */}
              {/* <Customized component={customizedGroupTick} /> */}
              <Line
                data={lastSess}
                strokeWidth={"1"}
                dataKey="data_s"
                stroke="#9566FB"
                // label={CustomizedLabel}
              />
              <Line
                data={firstSess}
                strokeWidth={"1"}
                dataKey="data_f"
                stroke="#00B394"
                // label ={CustomizedLabel}
              />
              {selectedSess.length > 0 && (
                <Line
                  data={selectedSess}
                  strokeWidth={"1"}
                  dataKey="град."
                  stroke="red"
                  // label ={CustomizedLabel}
                />
              )}

              <CartesianGrid strokeDasharray="3 3" opacity={50} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      );
    }
  }
};
