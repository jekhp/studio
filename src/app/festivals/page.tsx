"use client";

import React, { useState, useMemo } from 'react';
import { FestivalCard } from '@/components/FestivalCard';
import { festivals, type Festival } from '@/lib/festivals';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allMonths = Array.from(new Set(festivals.map(f => f.date.start.getMonth())));
const monthOptions = allMonths.map(month => ({
  value: month.toString(),
  label: new Date(0, month).toLocaleString('es-ES', { month: 'long' }),
})).sort((a, b) => parseInt(a.value) - parseInt(b.value));

const allCategories = Array.from(new Set(festivals.flatMap(f => f.categories)));

export default function FestivalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredFestivals = useMemo(() => {
    return festivals
      .filter(festival => {
        const matchesSearch = festival.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMonth = selectedMonth === 'all' || festival.date.start.getMonth() === parseInt(selectedMonth, 10);
        const matchesCategory = selectedCategory === 'all' || festival.categories.includes(selectedCategory);
        return matchesSearch && matchesMonth && matchesCategory;
      })
      .sort((a, b) => a.date.start.getTime() - b.date.start.getTime());
  }, [searchTerm, selectedMonth, selectedCategory]);

  const festivalsToShow = filteredFestivals.slice(0, visibleCount);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('all');
    setSelectedCategory('all');
    setVisibleCount(9);
  };

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
            <div className='flex gap-4 w-full md:w-auto flex-wrap'>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    {monthOptions.map(m => (
                        <SelectItem key={m.value} value={m.value}>{m.label.charAt(0).toUpperCase() + m.label.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {allCategories.map(c => (
                        <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                    <X className="h-4 w-4 mr-2"/>
                    Clear
                </Button>
            </div>
        </div>
      </div>
      
      {festivalsToShow.length > 0 ? (
         <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[20px]">
              <AnimatePresence>
                {festivalsToShow.map((festival) => (
                  <motion.div
                    key={festival.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      ${festival.description.length > 100 ? 'row-span-[24]' : 'row-span-[20]'}
                      ${festival.description.length < 50 ? 'row-span-[18]' : ''}
                    `}
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
