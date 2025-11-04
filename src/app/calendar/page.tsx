"use client";

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { festivals, type Festival } from '@/lib/festivals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PartyPopper, Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isWithinInterval, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function CalendarPage() {
  const { t } = useLanguage();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [festivalsOnDate, setFestivalsOnDate] = React.useState<Festival[]>([]);

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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const activeFestivals = festivals.filter(f =>
        isWithinInterval(selectedDate, { start: new Date(f.date.start), end: new Date(f.date.end) })
      );
      setFestivalsOnDate(activeFestivals);
    } else {
      setFestivalsOnDate([]);
    }
  };

  React.useEffect(() => {
    handleDateSelect(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DayWithPopover = ({ date, displayMonth }: { date: Date, displayMonth: Date }) => {
    const isOutsideMonth = date.getMonth() !== displayMonth.getMonth();
    const isFestivalDay = festivalDays.has(date.toDateString());
    const isSelected = date && isSameDay(date, date ?? new Date());

    const festivalsOnThisDay = festivals.filter(f => isWithinInterval(date, { start: new Date(f.date.start), end: new Date(f.date.end) }));

    const dayButton = (
      <Button
        variant="ghost"
        className={`h-12 w-full p-0 font-normal flex-col relative transition-colors duration-200 ${isOutsideMonth ? 'text-muted-foreground/50' : ''} ${isSelected ? 'bg-accent' : ''} hover:bg-accent`}
        onClick={() => handleDateSelect(date)}
      >
        <span>{format(date, 'd')}</span>
        {isFestivalDay && !isOutsideMonth && (
          <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-primary" />
        )}
      </Button>
    );

    if (isFestivalDay && !isOutsideMonth && festivalsOnThisDay.length > 0) {
      return (
        <Popover>
          <PopoverTrigger asChild>{dayButton}</PopoverTrigger>
          <PopoverContent className="w-72 p-2" side="top" align="center">
            <div className="space-y-2">
              <p className="font-semibold text-sm text-center px-2 py-1">
                {t('ui.calendar.festivalsOn', { date: format(date, 'MMMM do') })}
              </p>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {festivalsOnThisDay.map(f => (
                  <Link
                    key={f.slug}
                    href={`/festivals/${f.slug}`}
                    className="block text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-muted/50"
                  >
                    {f.name}
                  </Link>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    }

    return dayButton;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">Festival Calendar</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('ui.calendar.subtitle')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <Card className="w-full lg:w-auto lg:max-w-md flex-shrink-0">
          <CardContent className="p-2 md:p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md"
              classNames={{
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-lg font-headline font-bold",
                nav_button: "h-9 w-9 bg-transparent hover:bg-accent rounded-full",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                head_cell: "text-muted-foreground rounded-md w-full font-normal text-sm",
                cell: "w-full text-center text-sm p-0.5 relative focus-within:relative focus-within:z-20",
                day: "h-12 w-full p-0"
              }}
              components={{
                Day: DayWithPopover,
              }}
            />
          </CardContent>
        </Card>

        <div className="flex-grow w-full">
            <Card className="w-full h-fit min-h-[500px]">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2 text-2xl">
                  <PartyPopper className="h-6 w-6 text-primary" />
                  <span>
                    {t('ui.calendar.eventsOn', { date: date ? format(date, 'MMMM do, yyyy') : '...' })}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {festivalsOnDate.length > 0 ? (
                  <div className="space-y-4">
                    {festivalsOnDate.map(festival => {
                      const placeholder = PlaceHolderImages.find(p => p.id === festival.image);
                      const locationText = t(`festivals:${festival.slug}:location_detail`, { defaultValue: festival.location });
                      return (
                        <Link
                          key={festival.id}
                          href={`/festivals/${festival.slug}`}
                          className="group block rounded-lg border hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row">
                             {placeholder && (
                                <div className="relative h-32 sm:h-auto sm:w-40 flex-shrink-0">
                                  <Image
                                    src={placeholder.imageUrl}
                                    alt={festival.name}
                                    fill
                                    className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                                    data-ai-hint={placeholder.imageHint}
                                  />
                                </div>
                              )}
                              <div className='p-4 flex flex-col justify-between'>
                                <div>
                                  <h3 className="font-headline text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {festival.name}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>{locationText}</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-end text-sm font-medium text-primary mt-4">
                                  {t('ui.common.viewDetails')}
                                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 flex flex-col items-center">
                      <CalendarIcon className="h-16 w-16 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground font-medium">{t('ui.calendar.noFestivals')}</p>
                      <p className="text-muted-foreground text-sm">{t('ui.calendar.tryAnotherDate')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
