"use client";

import React, { useState, useMemo } from 'react';
import { FestivalCard } from '@/components/FestivalCard';
import { festivals, type Festival } from '@/lib/festivals';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/language-context';

const allMonths = Array.from(new Set(festivals.map(f => f.date.start.getMonth())));
const allCategories = Array.from(new Set(festivals.flatMap(f => f.categories)));

export default function FestivalsPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

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
        const festivalName = festival.name; // Keep original name
        const matchesSearch = festivalName.toLowerCase().includes(searchTerm.toLowerCase());
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
  
  const formatCategoryKey = (category: string) => {
    return category.replace(/ /g, '-').replace(/ñ/g, 'n');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">{t('ui.festivalsPage.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('ui.festivalsPage.subtitle')}
        </p>
      </div>

      {/* Filters Section */}
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
                {t('ui.festivalsPage.loadMore')}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">{t('ui.festivalsPage.noFestivalsFound')}</p>
        </div>
      )}

    </div>
  );
}
