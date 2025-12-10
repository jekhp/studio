
"use client";

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, MapPin, Sparkles, Film, Image as ImageIcon, PlayCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';

import { festivals, Festival } from '@/lib/festivals';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FestivalMap } from '@/components/FestivalMap';
import { TranslationWrapper } from '@/components/TranslationWrapper';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function FestivalDetailPage({ params }: { params: { slug: string } }) {
  const [festival, setFestival] = useState<Festival | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<{ embedCode: string; alt: string } | null>(null);

  useEffect(() => {
    async function getFestivalData() {
      const foundFestival = festivals.find((f) => f.slug === params.slug);
      if (foundFestival) {
        setFestival(foundFestival);
      }
      setLoading(false);
    }
    getFestivalData();
  }, [params.slug]);


  if (loading) {
    return (
        <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="mt-12 space-y-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    );
  }

  if (!festival) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find((p) => p.id === festival.image);
  const formattedDateRange = `${format(new Date(festival.date.start), 'MMMM do')} - ${format(new Date(festival.date.end), 'MMMM do, yyyy')}`;

  const scheduleKeys = festival.scheduleKeys || [];
  const traditionKeys = festival.traditionKeys || [];
  const media = festival.media || [];

  const mapLocations = [{
    ...festival,
    coords: festival.coords,
    popup: `<div class="w-48"><h3 class="font-bold text-base">${festival.name}</h3><p class="text-xs">${festival.location}</p></div>`
  }];

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
                  <TranslationWrapper translationKey={`festivals:${festival.slug}:location_detail`} as="span" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
            <div className="space-y-8">
                <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">About {festival.name}</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                    <TranslationWrapper translationKey={`festivals:${festival.slug}:longDescription`} as="p" />
                </CardContent>
                </Card>

                <Tabs defaultValue="schedule" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="schedule">
                        <TranslationWrapper translationKey="ui.tabs.schedule" />
                    </TabsTrigger>
                    <TabsTrigger value="history">
                        <TranslationWrapper translationKey="ui.tabs.history" />
                    </TabsTrigger>
                    <TabsTrigger value="traditions">
                        <TranslationWrapper translationKey="ui.tabs.traditions" />
                    </TabsTrigger>
                    <TabsTrigger value="location">
                        <TranslationWrapper translationKey="ui.tabs.location" />
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="schedule">
                    <Card>
                    <CardContent className="pt-6 space-y-6">
                        {scheduleKeys.map((day, i) => (
                        <div key={i}>
                            <h3 className="font-semibold mb-2"><TranslationWrapper translationKey={`festivals:${festival.slug}:schedule:${day.dayKey}`} /></h3>
                            <div className="space-y-4">
                            {day.eventKeys.map((event, j) => (
                                <div key={j} className="flex items-start gap-3 pl-4 border-l-2 border-primary/50">
                                <Clock className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                <div>
                                    <p className="font-medium"><TranslationWrapper translationKey={`festivals:${festival.slug}:schedule:${event.timeKey}`} /></p>
                                    <p className="text-sm text-muted-foreground"><TranslationWrapper translationKey={`festivals:${festival.slug}:schedule:${event.descriptionKey}`} /></p>
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
                            <TranslationWrapper translationKey={`festivals:${festival.slug}:history`} as="p" />
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
                                            <TranslationWrapper translationKey={`festivals:${festival.slug}:traditions:${traditionKey}`} />
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
                        <FestivalMap locations={mapLocations} zoom={13} />
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                </Tabs>
            </div>
        </div>

        {media.length > 0 && (
          <div className="mt-12">
            <h2 className="font-headline text-3xl mb-6">Galería Multimedia</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {media.map((item, index) => (
                <Card key={index} className="overflow-hidden group">
                  {item.type === 'image' && item.url ? (
                    <div className="relative aspect-video">
                      <Image
                        src={item.url}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                       <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                    </div>
                  ) : item.type === 'video' && item.embedCode ? (
                    <button
                      onClick={() => setSelectedVideo({ embedCode: item.embedCode!, alt: item.alt })}
                      className="relative aspect-video w-full bg-black cursor-pointer"
                    >
                      {item.thumbnail ? (
                        <Image src={item.thumbnail} alt={item.alt} fill className="object-cover opacity-70 group-hover:opacity-50 transition-opacity"/>
                      ) : (
                        <div className="w-full h-full bg-slate-900"/>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                      </div>
                      <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full z-10">
                        <Film className="h-5 w-5" />
                      </div>
                    </button>
                  ) : null}
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground truncate">{item.alt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

       <Dialog open={!!selectedVideo} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="p-4">
                <DialogTitle>{selectedVideo?.alt}</DialogTitle>
            </DialogHeader>
            {selectedVideo && (
                <div className="aspect-video">
                    <div 
                        className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                        dangerouslySetInnerHTML={{ __html: selectedVideo.embedCode }} 
                    />
                </div>
            )}
        </DialogContent>
      </Dialog>
      
      <div className="h-16"></div>
    </div>
  );
}
