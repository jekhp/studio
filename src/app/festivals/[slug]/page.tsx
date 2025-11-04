import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, MapPin, Sparkles, Star } from 'lucide-react';
import { format } from 'date-fns';

import { festivals, type Review } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rating } from '@/components/Rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FestivalMap } from '@/components/FestivalMap';
import { TranslationWrapper } from '@/components/TranslationWrapper';

export async function generateStaticParams() {
  return festivals.map((festival) => ({
    slug: festival.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const festival = festivals.find((f) => f.slug === params.slug);
  if (!festival) {
    return {
      title: 'Festival Not Found',
    };
  }
  return {
    title: `${festival.name} | CuscoFest`,
  };
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex items-start space-x-4">
      <Avatar>
        <AvatarFallback>{review.user.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{review.user}</p>
          <Rating rating={review.rating} size={16} showText={false} />
        </div>
        <p className="text-muted-foreground text-sm mt-1">{review.comment}</p>
      </div>
    </div>
  );
}

function ReviewForm() {
    return (
        <form className="space-y-4">
            <Input placeholder="Your Name" />
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Your Rating:</span>
                {/* Basic rating input for demonstration */}
                <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 text-gray-300 hover:text-primary cursor-pointer"/>)}
                </div>
            </div>
            <Textarea placeholder="Write your review..." />
            <Button className="bg-primary text-primary-foreground">Submit Review</Button>
        </form>
    )
}

export default function FestivalDetailPage({ params }: { params: { slug: string } }) {
  const festival = festivals.find((f) => f.slug === params.slug);

  if (!festival) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find((p) => p.id === festival.image);
  const formattedDateRange = `${format(festival.date.start, 'MMMM do')} - ${format(festival.date.end, 'MMMM do, yyyy')}`;

  const scheduleKeys = festival.scheduleKeys || [];
  const traditionKeys = festival.traditionKeys || [];

  return (
    <div className="bg-background">
      <div className="relative h-[40vh] md:h-[55vh] w-full">
        {placeholder && (
          <Image
            src={placeholder.imageUrl}
            alt={festival.name}
            fill
            className="object-cover"
            priority
            data-ai-hint={placeholder.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-24 md:-mt-32 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-headline text-4xl md:text-6xl text-foreground">{festival.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDateRange}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{festival.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Rating rating={festival.rating} size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">About {festival.name}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <TranslationWrapper translationKey={`festival_${festival.slug}_longDescription`} as="p" />
              </CardContent>
            </Card>

            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="schedule">
                    <TranslationWrapper translationKey="tabSchedule" />
                </TabsTrigger>
                <TabsTrigger value="history">
                    <TranslationWrapper translationKey="tabHistory" />
                </TabsTrigger>
                <TabsTrigger value="traditions">
                    <TranslationWrapper translationKey="tabTraditions" />
                </TabsTrigger>
                <TabsTrigger value="location">
                    <TranslationWrapper translationKey="tabLocation" />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="schedule">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    {scheduleKeys.map((day, i) => (
                      <div key={i}>
                        <h3 className="font-semibold mb-2"><TranslationWrapper translationKey={day.dayKey} /></h3>
                        <div className="space-y-4">
                          {day.eventKeys.map((event, j) => (
                            <div key={j} className="flex items-start gap-3 pl-4 border-l-2 border-primary/50">
                              <Clock className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                              <div>
                                <p className="font-medium"><TranslationWrapper translationKey={event.timeKey} /></p>
                                <p className="text-sm text-muted-foreground"><TranslationWrapper translationKey={event.descriptionKey} /></p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history">
                <Card>
                    <CardContent className="pt-6 prose prose-sm max-w-none text-muted-foreground">
                        <TranslationWrapper translationKey={`festival_${festival.slug}_history`} as="p" />
                    </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="traditions">
                <Card>
                    <CardContent className="pt-6">
                        <ul className="space-y-3">
                            {traditionKeys.map((traditionKey, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Sparkles className="h-4 w-4 mt-1 text-primary flex-shrink-0"/>
                                    <span className="text-muted-foreground">
                                        <TranslationWrapper translationKey={traditionKey} />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
              </TabsContent>
               <TabsContent value="location">
                <Card>
                  <CardContent className="pt-6">
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                       <FestivalMap locations={[{ coords: festival.coords, popup: `<div class="w-48"><h3 class="font-bold text-base">${festival.name}</h3><p class="text-xs">${festival.location}</p></div>` }]} zoom={13} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Reviews & Ratings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {festival.reviews.map(review => (
                        <div key={review.id}>
                            <ReviewCard review={review} />
                            <Separator className="mt-4" />
                        </div>
                    ))}
                </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Leave a Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <ReviewForm />
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
      <div className="h-16"></div>
    </div>
  );
}
