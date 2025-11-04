"use client";

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { festivals, type Festival } from '@/lib/festivals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PartyPopper, Calendar as CalendarIcon, Info } from 'lucide-react';
import { format, isWithinInterval, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function CalendarPage() {
  const { t } = useLanguage();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const festivalsOnDate = React.useMemo(() => {
    if (!date) return [];
    return festivals.filter(f =>
      isSameDay(new Date(f.date.start), date) || 
      isSameDay(new Date(f.date.end), date) ||
      isWithinInterval(date, { start: new Date(f.date.start), end: new Date(f.date.end) })
    );
  }, [date]);

  const festivalDays = React.useMemo(() => {
    const dates = new Set<string>();
    festivals.forEach(f => {
      let currentDate = new Date(f.date.start);
      const endDate = new Date(f.date.end);
      while (currentDate <= endDate) {
        dates.add(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return dates;
  }, []);

  React.useEffect(() => {
    // Select today's date on initial load
    setDate(new Date());
  }, []);

  const DayWithFestival = ({ date, displayMonth }: { date: Date, displayMonth: Date }) => {
    const isOutsideMonth = date.getMonth() !== displayMonth.getMonth();
    const isFestivalDay = festivalDays.has(date.toDateString());
    const isSelected = date && isSameDay(date, date ?? new Date());

    return (
      <div 
        className={
          `h-12 w-full flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer relative
          ${isOutsideMonth ? 'text-muted-foreground/30 bg-muted/20' : 'bg-card/80'}
          ${isFestivalDay && !isOutsideMonth ? 'font-bold text-primary-foreground bg-primary shadow-md hover:shadow-lg' : ''}
          ${isSelected ? 'ring-2 ring-destructive ring-offset-2 ring-offset-background' : ''}
          hover:scale-105 hover:shadow-md`
        }
      >
        <span>{format(date, 'd')}</span>
        {isFestivalDay && !isOutsideMonth && (
          <PartyPopper className="absolute top-1 right-1 h-3 w-3 text-white/80" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/80 via-primary to-destructive/80 text-primary-foreground p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-headline">{t('ui.calendar.title', {defaultValue: "Festival Calendar"})}</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto opacity-90">
            {t('ui.calendar.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-border flex justify-center items-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full max-w-md"
              classNames={{
                caption_label: "text-2xl font-headline font-bold text-foreground",
                nav_button: "h-10 w-10 bg-primary/20 text-primary rounded-full hover:bg-primary/30",
                head_cell: "text-muted-foreground rounded-md w-full font-bold text-sm pb-2 border-b-2 border-primary/50",
                cell: "w-full text-center text-sm p-1",
                day: "h-12 w-full p-0"
              }}
              components={{
                Day: DayWithFestival,
              }}
            />
          </div>

          <div className="lg:w-1/2 p-6 flex flex-col min-h-[500px]">
            <h2 className="font-headline text-2xl mb-4 flex items-center gap-2">
              <Info className="h-6 w-6 text-primary" />
              {t('ui.calendar.eventsOn', { date: date ? format(date, 'MMMM do, yyyy') : '...' })}
            </h2>

            {festivalsOnDate.length > 0 ? (
              <div className="space-y-4 overflow-y-auto">
                {festivalsOnDate.map(festival => {
                  const placeholder = PlaceHolderImages.find(p => p.id === festival.image);
                  const description = t(`festivals:${festival.slug}:description`);

                  return (
                    <Link
                      key={festival.id}
                      href={`/festivals/${festival.slug}`}
                      className="group block"
                    >
                      <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <div className="flex">
                          {placeholder && (
                            <div className="relative w-28 h-auto flex-shrink-0">
                              <Image
                                src={placeholder.imageUrl}
                                alt={festival.name}
                                fill
                                className="object-cover"
                                data-ai-hint={placeholder.imageHint}
                              />
                            </div>
                          )}
                          <CardContent className="p-4 flex flex-col justify-between">
                            <div>
                              <h3 className="font-headline text-lg font-semibold text-foreground group-hover:text-destructive transition-colors">
                                {festival.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
                            </div>
                            <div className="flex items-center text-sm font-medium text-primary mt-3">
                              {t('ui.common.viewDetails')}
                              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg">
                  <CalendarIcon className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-medium text-lg">{t('ui.calendar.noFestivals')}</p>
                  <p className="text-muted-foreground text-sm mt-1">{t('ui.calendar.tryAnotherDate')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
