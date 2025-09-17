import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface MapProps {
  selectedFilter?: string;
}

const InteractiveMap: React.FC<MapProps> = ({ selectedFilter = "all" }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenEntered, setTokenEntered] = useState(false);

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

  useEffect(() => {
    if (!mapContainer.current || !tokenEntered || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [78.9629, 20.5937], // Center of India
      zoom: 5,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each state/district
    map.current.on('load', () => {
      fraData.forEach((location) => {
        const totalClaims = location.approved + location.pending + location.rejected;
        const approvalRate = (location.approved / totalClaims * 100).toFixed(1);
        
        // Create marker color based on approval rate
        let markerColor = '#ef4444'; // red for low approval
        if (parseFloat(approvalRate) > 70) markerColor = '#22c55e'; // green for high approval
        else if (parseFloat(approvalRate) > 50) markerColor = '#eab308'; // yellow for medium approval

        // Create popup content
        const popupContent = `
          <div class="p-2">
            <h3 class="font-bold text-lg">${location.state}</h3>
            <p class="text-sm text-gray-600">${location.district} District</p>
            <div class="mt-2 space-y-1">
              <div class="flex justify-between">
                <span class="text-green-600">Approved:</span>
                <span class="font-semibold">${location.approved.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-yellow-600">Pending:</span>
                <span class="font-semibold">${location.pending.toLocaleString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-red-600">Rejected:</span>
                <span class="font-semibold">${location.rejected.toLocaleString()}</span>
              </div>
              <div class="border-t pt-1 mt-2">
                <div class="flex justify-between">
                  <span>Total Claims:</span>
                  <span class="font-bold">${totalClaims.toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                  <span>Approval Rate:</span>
                  <span class="font-bold">${approvalRate}%</span>
                </div>
              </div>
            </div>
          </div>
        `;

        // Create marker
        const marker = new mapboxgl.Marker({
          color: markerColor,
          scale: 0.8
        })
          .setLngLat([location.lng, location.lat])
          .setPopup(new mapboxgl.Popup().setHTML(popupContent))
          .addTo(map.current!);
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [tokenEntered, mapboxToken]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenEntered(true);
    }
  };

  if (!tokenEntered) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Enter Mapbox Token</h3>
            <p className="text-sm text-muted-foreground">
              To display the interactive map, please enter your Mapbox public token.
              You can get one from{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTokenSubmit}>Load Map</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="font-semibold text-sm mb-2">Forest Rights Act Claims</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>High Approval (&gt;70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium Approval (50-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Low Approval (&lt;50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;