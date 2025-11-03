
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, MapPin, Calendar, Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Festival } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UpcomingFestivalCardProps {
  festival: Festival;
}

const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: {label: string, value: number}[] = [
    { label: 'Días', value: (timeLeft as any).days },
    { label: 'Horas', value: (timeLeft as any).hours },
    { label: 'Min', value: (timeLeft as any).minutes },
    { label: 'Seg', value: (timeLeft as any).seconds },
  ];

  return (
    <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-background/90 backdrop-blur-md rounded-xl p-3 shadow-lg flex justify-around text-center"
    >
        {timerComponents.map(({label, value}) => (
           value !== undefined && (
            <div key={label} className="flex flex-col">
                <span className="text-2xl font-bold text-primary">{String(value).padStart(2, '0')}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
            </div>
           )
        ))}
    </div>
  );
};


export const UpcomingFestivalCard = ({ festival }: UpcomingFestivalCardProps) => {
  const [isInterested, setIsInterested] = useState(false);
  
  const placeholder = PlaceHolderImages.find((p) => p.id === festival.image);
  
  const now = new Date();
  const isFinished = now > festival.date.end;
  const isImminent = !isFinished && (festival.date.start.getTime() - now.getTime()) < 24 * 60 * 60 * 1000;

  const cardStateClasses = cn({
    'opacity-60': isFinished,
    'blinking-border border-2': isImminent,
  });

  const formattedDateRange = `${format(festival.date.start, 'dd MMM')} - ${format(festival.date.end, 'dd MMM, yyyy')}`;

  return (
    <div className={cn("group relative rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-2xl", cardStateClasses)}>
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
        {placeholder && (
          <Image
            src={placeholder.imageUrl}
            alt={festival.name}
            fill
            className={cn("object-cover transition-transform duration-300 ease-in-out group-hover:scale-105", {
                'saturate-100': !isFinished,
                'saturate-0': isFinished,
            })}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={placeholder.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {isImminent && <Badge variant="destructive" className="absolute top-3 right-3 animate-pulse">¡EMPIEZA PRONTO!</Badge>}
        {isFinished && <Badge className="absolute top-3 right-3">FINALIZADA</Badge>}
        
        {!isFinished && <Countdown targetDate={festival.date.start} />}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-headline font-bold text-foreground">🎉 {festival.name}</h3>
        
        <div className="mt-2 flex flex-col space-y-1 text-sm text-muted-foreground">
            <div className='flex items-center gap-2'>
                <MapPin className="h-4 w-4 text-primary"/>
                <span>{festival.location}</span>
            </div>
            <div className='flex items-center gap-2'>
                <Calendar className="h-4 w-4 text-primary"/>
                <span>{formattedDateRange}</span>
            </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="font-bold">{festival.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({festival.interest}k reseñas)</span>
            </div>
            <Button 
              variant={isInterested ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setIsInterested(!isInterested)}
              className="transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <Heart className={cn("mr-2 h-4 w-4", isInterested && "fill-current")} />
              {isInterested ? 'Me interesa' : 'Me interesa'}
            </Button>
        </div>
      </div>
    </div>
  );
};
