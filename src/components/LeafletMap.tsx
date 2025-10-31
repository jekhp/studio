'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

const defaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = L.icon({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'leaflet-marker-user'
});


L.Marker.prototype.options.icon = defaultIcon;


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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapCenter = center ?? locations[0]?.coords;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const cuscoBounds = {
            north: -12.0,
            south: -15.0,
            west: -73.5,
            east: -70.0,
          };

          const isInsideCusco =
            latitude <= cuscoBounds.north &&
            latitude >= cuscoBounds.south &&
            longitude <= cuscoBounds.east &&
            longitude >= cuscoBounds.west;

          if (isInsideCusco) {
            alert('Estás dentro de la región de Cusco. Mostrando tu ubicación.');
            setUserLocation([latitude, longitude]);
          } else {
            alert('Estás fuera de la región de Cusco. No se mostrará tu ubicación.');
          }
        },
        () => {
          alert('El usuario denegó la geolocalización.');
        }
      );
    }
  }, []);

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

    // Add user location marker if it exists and map is initialized
    if (userLocation && mapRef.current) {
        const marker = L.marker(userLocation, { icon: userIcon }).addTo(mapRef.current);
        marker.bindPopup("You are here");
    }

  }, [locations, mapCenter, zoom, userLocation]);
  
  if (!mapCenter) return <div>Loading map...</div>;

  return(
    <>
    <style>
      {`
        .leaflet-marker-user {
            filter: hue-rotate(330deg) saturate(1.5);
        }
      `}
    </style>
    <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
    </>
  );
};

export default LeafletMap;
