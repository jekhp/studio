'use client';

import dynamic from 'next/dynamic';
import { festivals } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

export default function MapPage() {
    const locations = festivals.flatMap(f => {
        const placeholder = PlaceHolderImages.find(p => p.id === f.image);
        const imageUrl = placeholder ? placeholder.imageUrl : 'https://picsum.photos/seed/default/200/100';

        if (f.locations) {
            return f.locations.map(loc => ({
                coords: loc.coords,
                popup: `
                    <a href="/festivals/${f.slug}" class="block w-48 no-underline text-current">
                      <img src="${imageUrl}" alt="${f.name}" class="w-full h-24 object-cover rounded-t-lg" />
                      <div class="p-2">
                        <h3 class="font-bold text-sm mb-1">${f.name}</h3>
                        <p class="text-xs text-muted-foreground mb-2">${loc.name}</p>
                        <p class="text-xs text-muted-foreground">${format(new Date(f.date.start), 'MMMM do')}</p>
                      </div>
                    </a>
                `,
            }));
        }
        
        // Fallback for old structure (should not happen with new data)
        if (f.coords) {
            return [{
                coords: f.coords,
                popup: `
                    <a href="/festivals/${f.slug}" class="block w-48 no-underline text-current">
                      <img src="${imageUrl}" alt="${f.name}" class="w-full h-24 object-cover rounded-t-lg" />
                      <div class="p-2">
                        <h3 class="font-bold text-sm mb-1">${f.name}</h3>
                        <p class="text-xs text-muted-foreground mb-2">${f.location}</p>
                        <p class="text-xs text-muted-foreground">${format(new Date(f.date.start), 'MMMM do')}</p>
                      </div>
                    </a>
                `,
            }];
        }

        return [];
    });

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline text-foreground">Festival Map</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Explore the locations of Cusco's vibrant festivals on the map below.
                </p>
            </div>
            <div className="aspect-[16/9] w-full bg-muted rounded-lg shadow-lg overflow-hidden border">
                <LeafletMap locations={locations} zoom={9} center={[-13.516, -71.979]} />
            </div>
        </div>
    );
}
