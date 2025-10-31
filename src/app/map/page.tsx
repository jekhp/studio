'use client';

import dynamic from 'next/dynamic';
import { festivals } from '@/lib/festivals';
import { format } from 'date-fns';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

export default function MapPage() {
  const locations = festivals.map(f => ({
    coords: f.coords,
    popup: `
      <div class="w-48">
        <h3 class="font-bold text-base mb-1">${f.name}</h3>
        <p class="text-xs mb-2">${f.description}</p>
        <p class="text-xs font-semibold mb-2">Starts: ${format(f.date.start, 'MMMM do')}</p>
        <a href="/festivals/${f.slug}" class="text-primary font-bold text-xs hover:underline">View Details &rarr;</a>
      </div>
    `,
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
