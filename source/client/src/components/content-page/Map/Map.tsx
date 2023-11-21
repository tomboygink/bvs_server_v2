import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const myIcon = new Icon({
  iconUrl: "./Vector4.svg",
  iconSize: [25, 25]
});
const styles = {
  mapRoot: {
    height: "400px"
  }
};

const MapPlaceholder = () => {
  return (
    <p>
      Map of London.{" "}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
};

interface IProps {
  longitude: any;
  latitude: any;
}

export const MapLefter = () => {
  console.log("ygtygy");
  let splArr = 32423423;
  let splArr1 = 3423423;
  return (
    <MapContainer
      key={splArr}
      attributionControl={false}
      style={styles.mapRoot}
      center={[Number(splArr), Number(splArr1)]}
      zoom={12}
      scrollWheelZoom={true}
      placeholder={<MapPlaceholder />}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">ООО Севербуринструмент</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[Number(splArr), Number(splArr1)]}></Marker>
    </MapContainer>
  );
};
