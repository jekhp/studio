"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from '@/components/ui/button';
import { FestivalCard } from '@/components/FestivalCard';
import { festivals } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { UpcomingFestivalCard } from '@/components/UpcomingFestivalCard';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const now = new Date();
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(now.getMonth() + 3);

  const upcomingFestivals = festivals
    .filter(f => f.date.start > now && f.date.start <= threeMonthsFromNow)
    .sort((a, b) => a.date.start.getTime() - b.date.start.getTime());
    
  const pastFestivals = festivals
    .filter(f => f.date.end <= now)
    .sort((a,b) => b.date.end.getTime() - a.date.end.getTime())
    .slice(0, 3);

  const displayedUpcomingFestivals = (upcomingFestivals.length > 0 ? upcomingFestivals : pastFestivals).slice(0,3);

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] text-primary-foreground">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline tracking-tight">
            La Guía Definitiva de los Festivales de Cusco
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-primary-foreground/90">
            Bienvenido a la única plataforma que documenta cada celebración en las 13 provincias de la región. Desde el majestuoso Inti Raymi hasta las joyas ocultas de cada distrito, tu aventura cultural comienza aquí.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 ease-in-out hover:scale-105">
            <Link href="/festivals">Explora los Festivales</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground">Featured Festivals</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a glimpse of the most iconic celebrations that define Cusco's cultural landscape.
            </p>
          </div>
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {festivals.map((festival) => (
                <CarouselItem key={festival.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <FestivalCard festival={festival} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground">Upcoming Festivals</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t miss out! These festivals are just around the corner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedUpcomingFestivals.map((festival) => (
              <UpcomingFestivalCard key={festival.id} festival={festival} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
