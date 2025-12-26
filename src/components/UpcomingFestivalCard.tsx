
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';
import { format, differenceInHours } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Festival } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Countdown } from './Countdown';

export const UpcomingFestivalCard = ({ festival }: { festival: Festival }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const placeholder = PlaceHolderImages.find((p) => p.id === festival.image);
  
  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration errors
    return (
        <div className="group relative rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-2xl aspect-[4/3]">
             <div className="w-full h-full bg-muted animate-pulse rounded-xl" />
        </div>
    );
  }
  
  const now = new Date();
  const isFinished = now > festival.date.end;
  const isImminent = !isFinished && differenceInHours(festival.date.start, now) < 24;

  const cardStateClasses = cn({
    'opacity-60': isFinished,
    'blinking-border border-2': isImminent,
  });

  const formattedDateRange = `${format(festival.date.start, 'dd MMM')} - ${format(festival.date.end, 'dd MMM, yyyy')}`;

  return (
    <Link href={`/festivals/${festival.slug}`} className={cn("group relative block rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-2xl overflow-hidden", cardStateClasses)}>
      <div className="relative h-40 w-full">
        {placeholder && (
          <Image
            src={placeholder.imageUrl}
            alt={festival.name}
            fill
            className={cn("object-cover transition-transform duration-300 ease-in-out group-hover:scale-105", {
                'saturate-100': !isFinished,
                'saturate-0': isFinished,
            })}
            sizes="(max-width: 768px) 100vw, 320px"
            data-ai-hint={placeholder.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {isImminent && <Badge variant="destructive" className="absolute top-2 right-2 animate-pulse">¡EMPIEZA PRONTO!</Badge>}
        {isFinished && <Badge className="absolute top-2 right-2">FINALIZADA</Badge>}
        
        {!isFinished && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-auto bg-background/80 backdrop-blur-sm rounded-lg p-2 px-3 shadow-lg border border-white/20">
                <Countdown targetDate={festival.date.start} />
            </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-md font-headline font-bold text-foreground truncate">🎉 {festival.name}</h3>
        
        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <div className='flex items-center gap-1.5'>
                <MapPin className="h-3 w-3 text-primary"/>
                <span>{festival.location}</span>
            </div>
            <div className='flex items-center gap-1.5'>
                <Calendar className="h-3 w-3 text-primary"/>
                <span>{formattedDateRange}</span>
            </div>
        </div>
      </div>
    </Link>
  );
};
