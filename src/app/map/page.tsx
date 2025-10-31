'use client';

import dynamic from 'next/dynamic';
import { festivals } from '@/lib/festivals';
import LeafletMap from '@/components/LeafletMap';


export default function MapPage() {
  const locations = festivals.map(f => ({
    coords: f.coords,
    popup: `<b>${f.name}</b><br>${f.location}`,
  }));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">Festival Map</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the locations of Cusco's vibrant festivals on the map below.
        </p>
      </div>
      <div className="aspect-[16/9] w-full bg-muted rounded-lg shadow-lg overflow-hidden">
        <LeafletMap locations={locations} zoom={9} center={[-13.516, -71.979]} />
      </div>
    </div>
  );
}
