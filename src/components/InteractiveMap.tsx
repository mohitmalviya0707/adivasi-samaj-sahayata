import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from './ui/card';
import tribalLandsData from '../data/tribalLands.json';

interface MapProps {
  selectedFilter?: string;
}

const InteractiveMap: React.FC<MapProps> = ({ selectedFilter = "all" }) => {
  const [isMapReady, setIsMapReady] = useState(false);

  // Sample FRA data points across India
  const fraData = [
    { id: 1, state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, approved: 1500, pending: 800, rejected: 300, district: "Bhopal" },
    { id: 2, state: "Chhattisgarh", lat: 21.2787, lng: 81.8661, approved: 1200, pending: 600, rejected: 250, district: "Raipur" },
    { id: 3, state: "Odisha", lat: 20.9517, lng: 85.0985, approved: 980, pending: 450, rejected: 180, district: "Bhubaneswar" },
    { id: 4, state: "Jharkhand", lat: 23.6102, lng: 85.2799, approved: 800, pending: 400, rejected: 200, district: "Ranchi" },
    { id: 5, state: "Andhra Pradesh", lat: 15.9129, lng: 79.7400, approved: 750, pending: 350, rejected: 150, district: "Kurnool" },
    { id: 6, state: "Telangana", lat: 18.1124, lng: 79.0193, approved: 600, pending: 300, rejected: 120, district: "Adilabad" },
    { id: 7, state: "Karnataka", lat: 15.3173, lng: 75.7139, approved: 550, pending: 280, rejected: 100, district: "Belgaum" },
    { id: 8, state: "Maharashtra", lat: 19.7515, lng: 75.7139, approved: 450, pending: 250, rejected: 80, district: "Nashik" },
    { id: 9, state: "Gujarat", lat: 22.2587, lng: 71.1924, approved: 300, pending: 150, rejected: 60, district: "Ahmedabad" },
    { id: 10, state: "Rajasthan", lat: 27.0238, lng: 74.2179, approved: 200, pending: 100, rejected: 40, district: "Udaipur" },
  ];

  // Fix Leaflet default markers
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  // Style functions for GeoJSON layers
  const getFeatureStyle = (feature: any) => {
    const properties = feature.properties;
    
    if (properties.status === 'accepted') {
      return { color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.3 };
    } else if (properties.status === 'rejected') {
      return { color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3 };
    } else if (properties.level === 'high') {
      return { color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.3 };
    }
    
    return { color: '#6b7280', fillColor: '#6b7280', fillOpacity: 0.3 };
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const properties = feature.properties;
      let popupContent = `<div class="p-2"><h3 class="font-bold">${properties.name}</h3>`;
      
      if (properties.status) {
        popupContent += `<p>Status: <span class="font-semibold">${properties.status}</span></p>`;
      }
      if (properties.level) {
        popupContent += `<p>Water Level: <span class="font-semibold">${properties.level}</span></p>`;
      }
      
      popupContent += `</div>`;
      layer.bindPopup(popupContent);
    }
  };

  useEffect(() => {
    setIsMapReady(true);
  }, []);

  if (!isMapReady) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p>Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <MapContainer
        center={[23.5, 80]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        
        {/* GeoJSON tribal lands and water zones */}
        <GeoJSON
          data={tribalLandsData as any}
          style={getFeatureStyle}
          onEachFeature={onEachFeature}
        />
        
        {/* FRA data markers */}
        {fraData.map((location) => {
          const totalClaims = location.approved + location.pending + location.rejected;
          const approvalRate = (location.approved / totalClaims * 100).toFixed(1);
          
          return (
            <Marker key={location.id} position={[location.lat, location.lng]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{location.state}</h3>
                  <p className="text-sm text-gray-600">{location.district} District</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-green-600">Approved:</span>
                      <span className="font-semibold">{location.approved.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-600">Pending:</span>
                      <span className="font-semibold">{location.pending.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Rejected:</span>
                      <span className="font-semibold">{location.rejected.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-1 mt-2">
                      <div className="flex justify-between">
                        <span>Total Claims:</span>
                        <span className="font-bold">{totalClaims.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approval Rate:</span>
                        <span className="font-bold">{approvalRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="font-semibold text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span>Accepted Tribal Lands</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span>Rejected Tribal Lands</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span>Water Level Zones</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span>FRA Data Points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;