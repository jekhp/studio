
'use client';

import dynamic from 'next/dynamic';
import { festivals } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format, endOfDay } from 'date-fns';
import { useLanguage } from '@/context/language-context';
import { Star } from 'lucide-react';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

export default function MapPage() {
    const { t } = useLanguage();

    const now = new Date();

    const activeFestivals = festivals.filter(f => {
        // Show festival if its end date is today or in the future
        return f.date.end >= endOfDay(now);
    });

    const locations = activeFestivals.map(f => {
        const placeholder = PlaceHolderImages.find(p => p.id === f.image);
        const imageUrl = placeholder ? placeholder.imageUrl : 'https://picsum.photos/seed/default/200/100';
        const locationDetail = t(`festivals:${f.slug}:location_detail`, { defaultValue: f.location });
        const regionalIndicator = f.isRegional ? `<div class="flex items-center gap-1 text-xs font-semibold text-amber-600"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>Fiesta Regional</div>` : '';

        return {
            ...f,
            popup: `
                <a href="/festivals/${f.slug}" class="block w-48 no-underline text-current">
                  <img src="${imageUrl}" alt="${f.name}" class="w-full h-24 object-cover rounded-t-lg" />
                  <div class="p-2">
                    <h3 class="font-bold text-sm mb-1">${f.name}</h3>
                    <p class="text-xs text-muted-foreground mb-2">${locationDetail}</p>
                    <p class="text-xs text-muted-foreground">${format(new Date(f.date.start), 'MMMM do')}</p>
                    ${regionalIndicator}
                  </div>
                </a>
            `,
        };
    });

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline text-foreground">Festival Map</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Explore the locations of upcoming and ongoing festivals in Cusco. Regional festivals are marked with a gold star.
                </p>
            </div>
            <div className="aspect-[16/9] w-full bg-muted rounded-lg shadow-lg overflow-hidden border">
                <LeafletMap locations={locations} zoom={9} center={[-13.516, -71.979]} />
            </div>
        </div>
    );
}
