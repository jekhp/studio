
'use client';

import dynamic from 'next/dynamic';
import { festivals } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format, endOfDay } from 'date-fns';
import { useLanguage } from '@/context/language-context';
import { RegionalFestivalBanner } from '@/components/RegionalFestivalBanner';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

export default function MapPage() {
    const { t } = useLanguage();

    const now = new Date();

    const upcomingFestivals = festivals.filter(f => {
        return f.date.end >= endOfDay(now);
    });

    const regionalChristmasFestival = upcomingFestivals.find(f => f.slug === 'navidad-cusquena-santurantikuy' && f.isRegional);
    const mapFestivals = upcomingFestivals.filter(f => !(f.isRegional));


    const locations = mapFestivals.map(f => {
        const placeholder = PlaceHolderImages.find(p => p.id === f.image);
        const imageUrl = placeholder ? placeholder.imageUrl : 'https://picsum.photos/seed/default/200/100';
        const locationDetail = t(`festivals:${f.slug}:location_detail`, { defaultValue: f.location });
        
        return {
            ...f,
            popup: `
                <a href="/festivals/${f.slug}" class="block w-48 no-underline text-current">
                  <img src="${imageUrl}" alt="${f.name}" class="w-full h-24 object-cover rounded-t-lg" />
                  <div class="p-2">
                    <h3 class="font-bold text-sm mb-1">${f.name}</h3>
                    <p class="text-xs text-muted-foreground mb-2">${locationDetail}</p>
                    <p class="text-xs text-muted-foreground">${format(new Date(f.date.start), 'MMMM do')}</p>
                  </div>
                </a>
            `,
        };
    });

    return (
        <div className="relative h-[calc(100vh-4rem)]">
            <div className="absolute inset-0 z-0">
                <LeafletMap locations={locations} zoom={9} center={[-13.516, -71.979]} />
            </div>

            {regionalChristmasFestival && (
                 <div className="absolute top-4 right-4 z-10 w-[90%] max-w-sm md:max-w-xs">
                    <RegionalFestivalBanner festival={regionalChristmasFestival} />
                </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent z-10 text-center pointer-events-none">
                 <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-headline text-foreground">Festival Map</h1>
                    <p className="mt-1 text-sm md:text-base text-muted-foreground">
                        Explore the locations of upcoming and ongoing festivals in Cusco. Regional festivals are marked with a gold star.
                    </p>
                </div>
            </div>
        </div>
    );
}
