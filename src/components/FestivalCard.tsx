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
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={placeholder.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow pt-6">
          <CardTitle className="font-headline text-2xl mb-2">{festival.name}</CardTitle>
          <CardDescription>{festival.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
            <div className='flex flex-wrap gap-2'>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{festival.location}</span>
              </Badge>
            </div>
            <div className="flex items-center text-primary font-semibold text-sm">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
