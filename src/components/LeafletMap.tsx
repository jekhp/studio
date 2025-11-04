'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'overlapping-marker-spiderfier-leaflet/dist/oms.min.js';
import type { Festival } from '@/lib/festivals';

// Fix for default icon issue with webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

const defaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const regionalIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const userIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


L.Marker.prototype.options.icon = defaultIcon;


interface LeafletMapProps {
  locations: (Festival & { popup: string })[];
  center?: [number, number];
  zoom: number;
}

const LeafletMap = ({ locations, center, zoom }: LeafletMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const omsRef = useRef<any>(null);
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
            setUserLocation([latitude, longitude]);
          }
        },
        () => {
          console.log("User denied geolocation.");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) { // Only initialize map once
      const map = L.map(mapContainerRef.current, {
          scrollWheelZoom: false, // disable zoom on scroll
      }).setView(mapCenter, zoom);
      mapRef.current = map;

      // @ts-ignore
      omsRef.current = new (L as any).OverlappingMarkerSpiderfier(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      locations.forEach(loc => {
        const icon = loc.isRegional ? regionalIcon : defaultIcon;
        const marker = L.marker(loc.coords, { icon });
        marker.bindPopup(loc.popup);
        omsRef.current.addMarker(marker);
      });
    }

    // Add user location marker if it exists and map is initialized
    if (userLocation && mapRef.current) {
        const marker = L.marker(userLocation, { icon: userIcon }).addTo(mapRef.current);
        marker.bindPopup("Estás aquí");
    }

  }, [locations, mapCenter, zoom, userLocation]);
  
  if (!mapCenter) return <div>Loading map...</div>;

  return(
    <>
    <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
    </>
  );
};

export default LeafletMap;
