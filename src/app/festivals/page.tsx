"use client";

import React, { useState, useMemo } from 'react';
import { FestivalCard } from '@/components/FestivalCard';
import { festivals, type Festival } from '@/lib/festivals';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ListFilter, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FestivalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredFestivals = useMemo(() => {
    return festivals
      .filter(festival => {
        const matchesSearch = festival.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMonth = selectedMonth === 'all' || festival.date.start.getMonth() === parseInt(selectedMonth, 10);
        const matchesPrice =
          priceFilter === 'all' ||
          (priceFilter === 'free' && festival.isFree) ||
          (priceFilter === 'paid' && !festival.isFree);
        return matchesSearch && matchesMonth && matchesPrice;
      })
      .sort((a, b) => a.date.start.getTime() - b.date.start.getTime());
  }, [searchTerm, selectedMonth, priceFilter]);

  const festivalsToShow = filteredFestivals.slice(0, visibleCount);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('all');
    setPriceFilter('all');
  };
  
  const allMonths = Array.from(new Set(festivals.map(f => f.date.start.getMonth())));
  const monthOptions = allMonths.map(month => ({
    value: month.toString(),
    label: new Date(0, month).toLocaleString('es-ES', { month: 'long' }),
  })).sort((a, b) => parseInt(a.value) - parseInt(b.value));


  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">Cusco's Festivals</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Immerse yourself in the rich tapestry of culture and tradition. Here is a comprehensive list of festivals that bring the heart of the Andes to life.
        </p>
      </div>

      {/* Filters Section */}
      <div className="sticky top-16 bg-background/95 backdrop-blur-sm z-30 py-4 mb-8 border-b">
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by festival name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className='flex gap-4 w-full md:w-auto'>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    {monthOptions.map(m => (
                        <SelectItem key={m.value} value={m.value}>{m.label.charAt(0).toUpperCase() + m.label.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className='flex items-center space-x-4 border rounded-md px-3 py-2'>
                    <RadioGroup value={priceFilter} onValueChange={setPriceFilter} className='flex items-center space-x-4'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="r-all" />
                            <Label htmlFor="r-all" className="text-sm">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="free" id="r-free" />
                            <Label htmlFor="r-free" className="text-sm">Free</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paid" id="r-paid" />
                            <Label htmlFor="r-paid" className="text-sm">Paid</Label>
                        </div>
                    </RadioGroup>
                </div>
                <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                    <X className="h-4 w-4 mr-2"/>
                    Clear
                </Button>
            </div>
        </div>
      </div>
      
      {festivalsToShow.length > 0 ? (
         <>
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              <AnimatePresence>
                {festivalsToShow.map((festival) => (
                  <motion.div
                    key={festival.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="break-inside-avoid"
                  >
                    <FestivalCard festival={festival} />
                  </motion.div>
                ))}
              </AnimatePresence>
          </div>
          {visibleCount < filteredFestivals.length && (
            <div className="text-center mt-12">
              <Button onClick={() => setVisibleCount(prev => prev + 9)}>
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No festivals found matching your criteria.</p>
        </div>
      )}

    </div>
  );
}
