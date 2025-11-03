import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

import type { Festival } from '@/lib/festivals';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface FestivalCardProps {
  festival: Festival;
}

export function FestivalCard({ festival }: FestivalCardProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === festival.image);
  const formattedDate = format(festival.date.start, 'MMMM do');

  return (
    <Link href={`/festivals/${festival.slug}`} className="group block">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden">
        {placeholder && (
          <div className="relative w-full overflow-hidden">
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                width={400}
                height={Math.floor(Math.random() * (500 - 300 + 1) + 300)} // Random height
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                data-ai-hint={placeholder.imageHint}
              />
          </div>
        )}
         <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-headline text-lg mb-2 font-semibold text-foreground">{festival.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-grow">{festival.description}</p>
            
            <div className='flex flex-wrap gap-2 mb-4'>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{festival.location}</span>
              </Badge>
            </div>
        </div>
      </Card>
    </Link>
  );
}
