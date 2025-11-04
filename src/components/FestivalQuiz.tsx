"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Heart, Calendar, Mountain, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { festivals } from '@/lib/festivals';
import { FestivalCard } from './FestivalCard';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

type Answer = {
    vibe: string;
    season: string;
    company: string;
}

const quizSteps = [
    {
        id: 'vibe',
        question: 'ui.quiz.vibe.question',
        options: [
            { value: 'espiritual', label: 'ui.quiz.vibe.options.spiritual.label', icon: Heart, description: 'ui.quiz.vibe.options.spiritual.description' },
            { value: 'fiesta', label: 'ui.quiz.vibe.options.party.label', icon: Heart, description: 'ui.quiz.vibe.options.party.description' },
            { value: 'cultural', label: 'ui.quiz.vibe.options.cultural.label', icon: Heart, description: 'ui.quiz.vibe.options.cultural.description' },
            { value: 'aventura', label: 'ui.quiz.vibe.options.adventure.label', icon: Mountain, description: 'ui.quiz.vibe.options.adventure.description' },
        ],
    },
    {
        id: 'season',
        question: 'ui.quiz.season.question',
        options: [
            { value: 'summer', label: 'ui.quiz.season.options.summer.label', icon: Calendar, description: 'ui.quiz.season.options.summer.description' },
            { value: 'autumn', label: 'ui.quiz.season.options.autumn.label', icon: Calendar, description: 'ui.quiz.season.options.autumn.description' },
            { value: 'winter', label: 'ui.quiz.season.options.winter.label', icon: Calendar, description: 'ui.quiz.season.options.winter.description' },
            { value: 'spring', label: 'ui.quiz.season.options.spring.label', icon: Calendar, description: 'ui.quiz.season.options.spring.description' },
        ],
    },
    {
        id: 'company',
        question: 'ui.quiz.company.question',
        options: [
            { value: 'solo', label: 'ui.quiz.company.options.solo.label', icon: User, description: 'ui.quiz.company.options.solo.description' },
            { value: 'couple', label: 'ui.quiz.company.options.couple.label', icon: Users, description: 'ui.quiz.company.options.couple.description' },
            { value: 'friends', label: 'ui.quiz.company.options.friends.label', icon: Users, description: 'ui.quiz.company.options.friends.description' },
            { value: 'family', label: 'ui.quiz.company.options.family.label', icon: Users, description: 'ui.quiz.company.options.family.description' },
        ],
    }
];

const scoringProfile = {
    vibe: {
        espiritual: ['religioso', 'peregrinacion', 'andino'],
        fiesta: ['conciertos', 'carnaval', 'espectaculo'],
        cultural: ['historico', 'tradicional', 'danza', 'artesania'],
        aventura: ['aventura', 'carreras', 'combate-ritual'],
    },
    season: {
        summer: [11, 0, 1], // Dec, Jan, Feb
        autumn: [2, 3, 4, 5], // Mar, Apr, May, Jun
        winter: [6, 7, 8], // Jul, Aug, Sep
        spring: [9, 10], // Oct, Nov
    },
    company: {
        solo: ['aventura', 'peregrinacion'],
        couple: ['tradicional', 'gastronomico'],
        friends: ['fiesta', 'conciertos', 'carnaval'],
        family: ['espectaculo', 'feria'],
    }
}

export function FestivalQuiz() {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Partial<Answer>>({});
    const [showResults, setShowResults] = useState(false);

    const currentStep = quizSteps[step];
    const progress = (step / quizSteps.length) * 100;

    const handleAnswer = (questionId: keyof Answer, value: string) => {
        const newAnswers = { ...answers, [questionId]: value };
        setAnswers(newAnswers);

        setTimeout(() => {
            if (step < quizSteps.length - 1) {
                setStep(step + 1);
            } else {
                setShowResults(true);
            }
        }, 300);
    };

    const recommendedFestivals = useMemo(() => {
        if (!showResults) return [];

        const scores: { [festivalId: string]: number } = {};

        festivals.forEach(festival => {
            scores[festival.id] = 0;
            const vibeProfile = scoringProfile.vibe[(answers.vibe as keyof typeof scoringProfile.vibe)];
            const companyProfile = scoringProfile.company[(answers.company as keyof typeof scoringProfile.company)];
            const seasonProfile = scoringProfile.season[(answers.season as keyof typeof scoringProfile.season)];

            // Vibe scoring
            festival.categories.forEach(cat => {
                if (vibeProfile.includes(cat)) scores[festival.id] += 2;
            });

            // Company scoring
            festival.categories.forEach(cat => {
                if (companyProfile.includes(cat)) scores[festival.id] += 1;
            });
            
            // Season scoring
            const festivalMonth = new Date(festival.date.start).getMonth();
            if(seasonProfile.includes(festivalMonth)) {
                scores[festival.id] += 3;
            }
        });

        const sortedFestivals = festivals
            .map(festival => ({ festival, score: scores[festival.id] || 0 }))
            .sort((a, b) => b.score - a.score);
        
        return sortedFestivals.slice(0,3);

    }, [showResults, answers]);

    const restartQuiz = () => {
        setStep(0);
        setAnswers({});
        setShowResults(false);
    };

    const variants = {
        enter: { opacity: 0, x: 50 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <Card className="overflow-hidden">
            <AnimatePresence mode="wait">
                {showResults ? (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 md:p-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-headline text-center mb-2">{t('ui.quiz.results.title')}</h2>
                        <p className="text-muted-foreground text-center mb-8">{t('ui.quiz.results.subtitle')}</p>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {recommendedFestivals.map(({festival}) => (
                                <div key={festival.id} className="break-inside-avoid">
                                     <FestivalCard festival={festival} />
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8 space-x-4">
                            <Button onClick={restartQuiz}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                {t('ui.quiz.results.retakeButton')}
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/festivals">
                                    {t('ui.quiz.results.seeAllButton')} <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key={step}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-6 md:p-8">
                            <Progress value={progress} className="mb-4" />
                            <p className="text-sm font-medium text-primary mb-2">{t('ui.quiz.step', { step: step + 1, total: quizSteps.length })}</p>
                            <h2 className="text-2xl md:text-3xl font-headline mb-8">{t(currentStep.question)}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentStep.options.map(option => (
                                    <Card
                                        key={option.value}
                                        onClick={() => handleAnswer(currentStep.id as keyof Answer, option.value)}
                                        className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 group"
                                    >
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="bg-secondary p-3 rounded-lg">
                                                <option.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{t(option.label)}</h3>
                                                <p className="text-sm text-muted-foreground">{t(option.description)}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
