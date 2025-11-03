
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, MapPin, Calendar, Star } from 'lucide-react';
import { format, differenceInHours } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Festival } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const totalHours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        setTimeLeft({ days, hours });
      } else {
        setTimeLeft({ days: 0, hours: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, [targetDate]);

  const totalHoursLeft = timeLeft.days * 24 + timeLeft.hours;

  if (totalHoursLeft <= 0) {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto bg-background/90 backdrop-blur-md rounded-xl p-3 px-5 shadow-lg flex justify-around text-center items-baseline gap-4">
      {totalHoursLeft > 48 ? (
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">{timeLeft.days}</span>
          <span className="text-xs text-muted-foreground">Días</span>
        </div>
      ) : totalHoursLeft > 24 ? (
        <>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">{timeLeft.days}</span>
            <span className="text-xs text-muted-foreground">Día</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">{timeLeft.hours}</span>
            <span className="text-xs text-muted-foreground">Horas</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">{timeLeft.hours}</span>
          <span className="text-xs text-muted-foreground">Horas</span>
        </div>
      )}
    </div>
  );
};


export const UpcomingFestivalCard = ({ festival }: { festival: Festival }) => {
  const [isInterested, setIsInterested] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const placeholder = PlaceHolderImages.find((p) => p.id === festival.image);
  
  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration errors
    return (
        <div className="group relative rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-2xl aspect-[3/4]">
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

  const handleInterestClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el enlace se active
    e.stopPropagation(); // Detiene la propagación del evento al enlace contenedor
    setIsInterested(!isInterested);
  }

  return (
    <Link href={`/festivals/${festival.slug}`} className={cn("group relative block rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-2xl", cardStateClasses)}>
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
              onClick={handleInterestClick}
              className="transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <Heart className={cn("mr-2 h-4 w-4", isInterested && "fill-current")} />
              {isInterested ? 'Me interesa' : 'Me interesa'}
            </Button>
        </div>
      </div>
    </Link>
  );
};
