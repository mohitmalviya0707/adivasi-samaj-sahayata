import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const fraData = [
  { id: 1, state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, approved: 1500, pending: 800, rejected: 300, district: "Bhopal" },
  { id: 2, state: "Chhattisgarh", lat: 21.2787, lng: 81.8661, approved: 1200, pending: 600, rejected: 250, district: "Raipur" },
];

const polygonCoords = [
  [23.2, 77.1],
  [23.4, 77.2],
  [23.3, 77.5],
];

const InteractiveMap = () => {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!isReady) return <p>Loading map...</p>;

  return (
    <div style={{ width: "100%", height: "450px" }}>
      <MapContainer
        center={[23.5, 80]}
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        {/* --- Esri World Imagery satellite tiles --- */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

        {/* Polygon Example */}
        <Polygon positions={polygonCoords} pathOptions={{ color: "orange" }} />

        {/* Markers */}
        {fraData.map((item) => {
          const total = item.approved + item.pending + item.rejected;
          const rate = ((item.approved / total) * 100).toFixed(1);

          return (
            <Marker key={item.id} position={[item.lat, item.lng]}>
              <Popup>
                <h3>{item.state}</h3>
                <p>{item.district}</p>
                <p>Approved: {item.approved}</p>
                <p>Pending: {item.pending}</p>
                <p>Rejected: {item.rejected}</p>
                <p>Approval Rate: {rate}%</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
