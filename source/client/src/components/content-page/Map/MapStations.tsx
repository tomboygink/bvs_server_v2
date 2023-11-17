import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import React from "react";
import MarkerClusterGroup from "./MarkerClusterGroup";

import { Icon } from "leaflet";

interface IProps {
  longitude: any;
  latitude: any;
}
//  let Logo = require('./mainLogo.png');

// const myIcon = new Icon({
//   iconUrl: `./mainLogo.png`,
//   iconSize: [25, 25]
// });

function MapStations() {
  const iconSettings = {
    mapIconUrl:
      '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{fillColor}" stroke="{strokeColor}  d="{path}"/></svg>'
  };

  // const position = [
  //   props.latitude.replace(/\,/g, "."),
  //   props.longitude.replace(/\,/g, ".")
  // ] as [number, number];
  return (
    <MapContainer
      attributionControl={false}
      center={[55.424704, 65.279797]}
      zoom={12}
      style={{ width: "100%", height: "300px", borderRadius: "4px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">ООО Севербуринструмент</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <MarkerClusterGroup>
        {/* {APP_STORAGE.devs.getChangeSensors2().map((row: any) => ( */}
        <React.Fragment key={"_map" + 56}>
          <Marker position={[55.424704, 65.279797]}>
            <Popup>3463546</Popup>
          </Marker>
        </React.Fragment>
      </MarkerClusterGroup>
    </MapContainer>
  );
}
export default MapStations;
