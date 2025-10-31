'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import dynamic from 'next/dynamic';

// Fix for default icon issue with webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  locations: {
    coords: [number, number];
    popup: string;
  }[];
  center?: [number, number];
  zoom: number;
}

const LeafletMap = ({ locations, center, zoom }: LeafletMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapCenter = center ?? locations[0]?.coords;

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) { // Only initialize map once
      const map = L.map(mapContainerRef.current).setView(mapCenter, zoom);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      locations.forEach(loc => {
        L.marker(loc.coords).addTo(map)
          .bindPopup(loc.popup);
      });
    }
  }, [locations, mapCenter, zoom]);
  
  if (!mapCenter) return <div>Loading map...</div>;

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
};

export default dynamic(() => Promise.resolve(LeafletMap), { ssr: false });
