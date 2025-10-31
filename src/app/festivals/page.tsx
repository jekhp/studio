import { FestivalCard } from '@/components/FestivalCard';
import { festivals } from '@/lib/festivals';

export const metadata = {
  title: 'All Festivals | CuscoFest',
  description: 'Explore all the vibrant festivals of Cusco.',
};

export default function FestivalsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">Cusco&apos;s Festivals</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Immerse yourself in the rich tapestry of culture and tradition. Here is a comprehensive list of festivals that bring the heart of the Andes to life.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {festivals.map((festival) => (
          <FestivalCard key={festival.id} festival={festival} />
        ))}
      </div>
    </div>
  );
}
