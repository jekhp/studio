
"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { FestivalCard } from '@/components/FestivalCard';
import { festivals, Festival } from '@/lib/festivals';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const allMonths = Array.from(new Set(festivals.map(f => new Date(f.date.start).getMonth())));
const allCategories = Array.from(new Set(festivals.flatMap(f => f.categories)));
const BATCH_SIZE = 9;

const getColumnCount = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth >= 1280) return 4;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

export default function FestivalsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [numColumns, setNumColumns] = useState(getColumnCount());
  const [columns, setColumns] = useState<Festival[][]>(() => Array.from({ length: numColumns }, () => []));
  const [visibleCount, setVisibleCount] = useState(0);

  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setNumColumns(getColumnCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const monthOptions = useMemo(() => {
    const monthKeys = [
      'ui.months.january', 'ui.months.february', 'ui.months.march', 'ui.months.april', 'ui.months.may', 'ui.months.june',
      'ui.months.july', 'ui.months.august', 'ui.months.september', 'ui.months.october', 'ui.months.november', 'ui.months.december'
    ];
    return allMonths.map(month => ({
      value: month.toString(),
      label: t(monthKeys[month]),
    })).sort((a, b) => parseInt(a.value) - parseInt(b.value));
  }, [t]);

  const filteredFestivals = useMemo(() => {
    return festivals
      .filter(festival => {
        const festivalName = festival.name; 
        const matchesSearch = festivalName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMonth = selectedMonth === 'all' || new Date(festival.date.start).getMonth() === parseInt(selectedMonth, 10);
        const matchesCategory = selectedCategory === 'all' || festival.categories.includes(selectedCategory);
        return matchesSearch && matchesMonth && matchesCategory;
      })
      .sort((a, b) => new Date(a.date.start).getTime() - new Date(b.date.start).getTime());
  }, [searchTerm, selectedMonth, selectedCategory]);

  // Reset columns and visible count when filters change or column count changes
  useEffect(() => {
    setColumns(Array.from({ length: numColumns }, () => []));
    setVisibleCount(BATCH_SIZE);
  }, [filteredFestivals, numColumns]);
  
  // Distribute items into columns when visibleCount changes
  useEffect(() => {
    if (visibleCount === 0) return;

    const itemsToAdd = filteredFestivals.slice(0, visibleCount);

    const newColumns = Array.from({ length: numColumns }, (): Festival[] => []);
    const columnHeights = Array(numColumns).fill(0);

    itemsToAdd.forEach(festival => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      newColumns[shortestColumnIndex].push(festival);
      // This is an approximation. A real implementation would use element heights.
      // For this app, card heights are similar enough that this works well.
      columnHeights[shortestColumnIndex] += 1; 
    });

    setColumns(newColumns);

  }, [visibleCount, filteredFestivals, numColumns]);


  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 200 >= document.documentElement.offsetHeight) {
      if (visibleCount < filteredFestivals.length) {
        setVisibleCount(prevCount => Math.min(prevCount + BATCH_SIZE, filteredFestivals.length));
      }
    }
  }, [visibleCount, filteredFestivals.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('all');
    setSelectedCategory('all');
  };
  
  const formatCategoryKey = (category: string) => {
    return category.replace(/ /g, '-').replace(/ñ/g, 'n');
  };

  const hasFestivals = columns.some(col => col.length > 0);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">{t('ui.festivalsPage.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('ui.festivalsPage.subtitle')}
        </p>
      </div>

      <div className="sticky top-16 bg-background/95 backdrop-blur-sm z-30 py-4 mb-8 border-b">
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('ui.festivalsPage.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className='flex gap-2 w-full md:w-auto'>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder={t('ui.festivalsPage.filterByMonth')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('ui.festivalsPage.allMonths')}</SelectItem>
                    {monthOptions.map(m => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder={t('ui.festivalsPage.filterByCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('ui.festivalsPage.allCategories')}</SelectItem>
                    {allCategories.map(c => (
                        <SelectItem key={c} value={c}>{t(`ui.categories.${formatCategoryKey(c)}`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                    <X className="h-4 w-4 md:mr-2"/>
                    <span className="hidden md:inline">{t('ui.festivalsPage.clearFilters')}</span>
                </Button>
            </div>
        </div>
      </div>
      
      {hasFestivals ? (
         <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-6">
                {column.map((festival) => (
                  <FestivalCard key={festival.id} festival={festival} />
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">{t('ui.festivalsPage.noFestivalsFound')}</p>
        </div>
      )}

    </div>
  );
}
