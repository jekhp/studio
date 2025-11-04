"use client";

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { festivals, type Festival } from '@/lib/festivals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, PartyPopper } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isWithinInterval } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export default function CalendarPage() {
  const { t } = useLanguage();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [festivalsOnDate, setFestivalsOnDate] = React.useState<Festival[]>([]);

  const festivalDays = festivals.flatMap(f => {
    const dates = [];
    let currentDate = new Date(f.date.start);
    const endDate = new Date(f.date.end);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  });

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
    if (date.getMonth() !== displayMonth.getMonth()) {
        return <div className="flex items-center justify-center w-9 h-9 text-muted-foreground opacity-50">{format(date, 'd')}</div>;
    }

    const isFestivalDay = festivalDays.some(festivalDate => festivalDate.toDateString() === date.toDateString());
    
    if (isFestivalDay) {
        const festivalsOnThisDay = festivals.filter(f => isWithinInterval(date, { start: f.date.start, end: f.date.end }));
        
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="default"
                        size="icon"
                        className="h-9 w-9 rounded-full relative"
                        onClick={() => handleDateSelect(date)}
                    >
                        {format(date, 'd')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="center" side="top">
                    <div className="space-y-2">
                        <p className="font-semibold text-sm text-center">Festivals on {format(date, 'MMMM do')}:</p>
                        <ul className="space-y-2">
                          {festivalsOnThisDay.map(f => (
                              <li key={f.slug}>
                                  <Link href={`/festivals/${f.slug}`} className="block text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-accent">
                                    {f.name}
                                  </Link>
                              </li>
                          ))}
                        </ul>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }

    // Default day rendering
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-md font-normal"
        onClick={() => handleDateSelect(date)}
      >
        {format(date, 'd')}
      </Button>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">Festival Calendar</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Plan your visit to Cusco with our interactive festival calendar. Click on a highlighted date to see what&apos;s happening.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <Card className="flex justify-center items-center w-full lg:w-auto">
          <CardContent className="p-2 md:p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md"
              modifiers={{
                festival: festivalDays,
              }}
              modifiersStyles={{
                festival: {
                  color: 'hsl(var(--primary-foreground))',
                  backgroundColor: 'hsl(var(--primary))',
                  borderRadius: '100%',
                },
              }}
              components={{
                Day: DayWithPopover
              }}
            />
          </CardContent>
        </Card>

        <Card className="lg:w-1/3 h-fit w-full">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <PartyPopper className="h-6 w-6 text-primary" />
              <span>
                Events on {date ? format(date, 'MMMM do, yyyy') : 'selected date'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {festivalsOnDate.length > 0 ? (
              <div className="space-y-4">
                {festivalsOnDate.map(festival => {
                   const locationText = t(`festivals:${festival.slug}:location_detail`, { defaultValue: festival.location });
                  return (
                    <Link
                      key={festival.id}
                      href={`/festivals/${festival.slug}`}
                      className="group block p-4 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <h3 className="font-semibold group-hover:text-primary">{festival.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{locationText}</p>
                      <div className="flex items-center justify-end text-sm font-medium text-primary mt-2">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <p className="text-muted-foreground">No festivals scheduled on this day.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
