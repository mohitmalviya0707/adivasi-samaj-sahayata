import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import tribalLandsData from "@/data/tribalLands.json";

const API_KEY = "AIzaSyCOsUu6B4UXcTbJOYtyBoDz_7u1-S8RMCA";

const fraData = [
  { id: 1, state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, approved: 1500, pending: 800, rejected: 300, district: "Bhopal" },
  { id: 2, state: "Chhattisgarh", lat: 21.2787, lng: 81.8661, approved: 1200, pending: 600, rejected: 250, district: "Raipur" },
];

const GoogleMapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || map) return;

    const googleMap = new google.maps.Map(mapRef.current, {
      center: { lat: 23.5, lng: 80 },
      zoom: 5,
      mapTypeId: "satellite"
    });

    setMap(googleMap);

    // Add FRA data markers
    fraData.forEach((item) => {
      const total = item.approved + item.pending + item.rejected;
      const rate = ((item.approved / total) * 100).toFixed(1);

      const marker = new google.maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map: googleMap,
        title: item.state
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3>${item.state}</h3>
            <p><strong>${item.district}</strong></p>
            <p>Approved: ${item.approved}</p>
            <p>Pending: ${item.pending}</p>
            <p>Rejected: ${item.rejected}</p>
            <p>Approval Rate: ${rate}%</p>
          </div>
        `
      });

      marker.addListener("click", () => {
        infoWindow.open(googleMap, marker);
      });
    });

    // Add GeoJSON polygons
    tribalLandsData.features.forEach((feature) => {
      if (feature.geometry.type === "Polygon") {
        const coordinates = feature.geometry.coordinates[0].map((coord: number[]) => ({
          lat: coord[1],
          lng: coord[0]
        }));

        const color = feature.properties.status === "accepted" ? "#00ff00" : 
                     feature.properties.status === "rejected" ? "#ff0000" : "#0000ff";

        const polygon = new google.maps.Polygon({
          paths: coordinates,
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
        });

        polygon.setMap(googleMap);

        const infoWindow = new google.maps.InfoWindow({
          content: `<div><strong>${feature.properties.name}</strong><br/>Status: ${feature.properties.status || feature.properties.level}</div>`
        });

        polygon.addListener("click", (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            infoWindow.setPosition(event.latLng);
            infoWindow.open(googleMap);
          }
        });
      }
    });

  }, [map]);

  return <div ref={mapRef} style={{ width: "100%", height: "450px" }} />;
};

const InteractiveMap = () => {
  return (
    <Wrapper apiKey={API_KEY} libraries={["maps"]}>
      <GoogleMapComponent />
    </Wrapper>
  );
};

export default InteractiveMap;
