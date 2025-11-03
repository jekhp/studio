import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/context/language-context';

import type { Festival } from '@/lib/festivals';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface FestivalCardProps {
  festival: Festival;
}

const categoryTranslations: { [key: string]: string } = {
  religioso: 'categoryReligious',
  gastronómico: 'categoryGastronomic',
  tradicional: 'categoryTraditional',
  espectáculo: 'categoryShow',
  feria: 'categoryFair',
  conciertos: 'categoryConcerts',
  artesanía: 'categoryHandicrafts',
  andino: 'categoryAndean',
  histórico: 'categoryHistoric',
  danza: 'categoryDance',
  peregrinación: 'categoryPilgrimage',
  aventura: 'categoryAdventure',
  carreras: 'categoryRaces',
  'combate ritual': 'categoryRitualCombat',
  agrícola: 'categoryAgricultural',
  taurino: 'categoryBullfighting',
  carnaval: 'categoryCarnival',
  moderno: 'categoryModern',
};

export function FestivalCard({ festival }: FestivalCardProps) {
  const { t } = useLanguage();
  const placeholder = PlaceHolderImages.find((p) => p.id === festival.image);
  const formattedDate = format(festival.date.start, 'MMMM do');

  const description = t(`festival_${festival.slug}_description`);
  
  return (
    <Link href={`/festivals/${festival.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden">
        {placeholder && (
          <div className="relative w-full h-48">
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                data-ai-hint={placeholder.imageHint}
              />
          </div>
        )}
         <CardContent className="p-4 flex-grow flex flex-col">
            <h3 className="font-headline text-lg mb-2 font-semibold text-foreground">{festival.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
            
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
            <div className="flex flex-wrap gap-1">
                {festival.categories.map(category => (
                    <Badge key={category} variant="outline" className="text-xs">{t(categoryTranslations[category] || category)}</Badge>
                ))}
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
