'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
  const mapCenter = center ?? locations[0]?.coords;

  if (!mapCenter) return <div>Loading map...</div>;

  return (
    <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={loc.coords}>
          <Popup>
            <div dangerouslySetInnerHTML={{ __html: loc.popup }} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
