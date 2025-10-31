'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
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
