import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { FestivalCard } from '@/components/FestivalCard';
import { festivals } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredFestivals = festivals.slice(0, 3);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

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
            Experience the Soul of Cusco
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-primary-foreground/90">
            Discover the vibrant traditions, breathtaking music, and unforgettable moments of Cusco&apos;s most celebrated festivals.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 ease-in-out hover:scale-105">
            <Link href="/festivals">Explore Festivals</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground">Featured Festivals</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a glimpse of the most iconic celebrations that define Cusco&apos;s cultural landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFestivals.map((festival) => (
              <FestivalCard key={festival.id} festival={festival} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
