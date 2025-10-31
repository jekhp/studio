"use client";

import * as React from "react";
import { Wand2, Sparkles, PartyPopper, Calendar, Mountain, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { festivals, type Festival } from "@/lib/festivals";
import { FestivalCard } from "@/components/FestivalCard";

type Answer = {
  questionId: string;
  value: string;
};

const quizQuestions = [
    {
        id: 'month',
        text: 'First, when are you planning to travel?',
        type: 'select',
        options: [
            { value: '4', label: 'May' },
            { value: '5', label: 'June' },
            { value: '6', label: 'July' },
        ],
    },
    {
        id: 'vibe',
        text: 'What kind of vibe are you looking for?',
        type: 'radio',
        options: [
            { value: 'party', label: 'A vibrant, lively party', points: { 'paucartambo-virgen-del-carmen': 1 } },
            { value: 'spiritual', label: 'A deep, spiritual experience', points: { 'qoyllur-riti': 1 } },
            { value: 'historic', label: 'A grand, historical reenactment', points: { 'inti-raymi': 1 } },
        ],
    },
    {
        id: 'activity',
        text: 'What kind of activity interests you most?',
        type: 'radio',
        options: [
            { value: 'procession', label: 'Watching colorful processions', points: { 'inti-raymi': 1, 'paucartambo-virgen-del-carmen': 1 } },
            { value: 'pilgrimage', label: 'Participating in a unique pilgrimage', points: { 'qoyllur-riti': 1 } },
            { value: 'dance', label: 'Seeing traditional masked dances', points: { 'paucartambo-virgen-del-carmen': 1 } },
        ],
    },
    {
        id: 'location',
        text: 'Choose a location type:',
        type: 'radio',
        options: [
            { value: 'city', label: 'A major historical site in Cusco city', points: { 'inti-raymi': 1 } },
            { value: 'town', label: 'A charming colonial town', points: { 'paucartambo-virgen-del-carmen': 1 } },
            { value: 'mountain', label: 'A remote, sacred mountain valley', points: { 'qoyllur-riti': 1 } },
        ],
    },
];

export default function RecommendationsPage() {
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [recommendations, setRecommendations] = React.useState<Festival[]>([]);
  const [quizCompleted, setQuizCompleted] = React.useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => {
      const otherAnswers = prev.filter(a => a.questionId !== questionId);
      return [...otherAnswers, { questionId, value }];
    });
  };

  const calculateRecommendations = () => {
    const scores: { [festivalId: string]: number } = {};
    festivals.forEach(f => scores[f.id] = 0);

    const monthAnswer = answers.find(a => a.questionId === 'month');
    if (!monthAnswer) return; // Month is mandatory

    answers.forEach(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      if (question && question.type === 'radio') {
        const option = question.options.find(o => o.value === answer.value);
        if (option?.points) {
          for (const festivalId in option.points) {
            scores[festivalId] += option.points[festivalId as keyof typeof option.points];
          }
        }
      }
    });
    
    const recommendedFestivals = festivals.filter(festival => {
      const festivalMonth = festival.date.start.getMonth();
      return festivalMonth === parseInt(monthAnswer.value, 10) && scores[festival.id] >= 1;
    });

    setRecommendations(recommendedFestivals);
    setQuizCompleted(true);
  };
  
  const resetQuiz = () => {
    setAnswers([]);
    setRecommendations([]);
    setQuizCompleted(false);
  }

  const isQuizAnswered = answers.length === quizQuestions.length;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground flex items-center justify-center gap-3">
          <Wand2 className="h-10 w-10 text-primary" />
          Festival Finder Quiz
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Answer a few questions to find the perfect Cusco festival for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {!quizCompleted ? (
            <Card>
            <CardContent className="p-6 space-y-8">
                {quizQuestions.map(q => (
                <div key={q.id}>
                    <h3 className="font-semibold text-lg mb-4">{q.text}</h3>
                    {q.type === 'select' ? (
                        <Select onValueChange={(value) => handleAnswerChange(q.id, value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a month..." />
                            </SelectTrigger>
                            <SelectContent>
                                {q.options.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <RadioGroup onValueChange={(value) => handleAnswerChange(q.id, value)}>
                            {q.options.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={opt.value} id={`${q.id}-${opt.value}`} />
                                    <Label htmlFor={`${q.id}-${opt.value}`}>{opt.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}
                </div>
                ))}
                <Button onClick={calculateRecommendations} disabled={!isQuizAnswered} className="w-full bg-primary text-primary-foreground">
                    Get Recommendations
                </Button>
            </CardContent>
            </Card>
        ) : (
          <div>
            <h2 className="text-3xl font-headline text-center mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary"/>
              Your Personal Recommendations
            </h2>
            {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                    {recommendations.map(festival => (
                        <FestivalCard key={festival.id} festival={festival} />
                    ))}
                </div>
            ) : (
                <Card className="text-center">
                    <CardContent className="p-8">
                        <PartyPopper className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                        <p className="text-muted-foreground">No festivals match your specific criteria for the selected month.</p>
                        <p className="text-sm text-muted-foreground mt-2">Try different answers or another month!</p>
                    </CardContent>
                </Card>
            )}
            <div className="text-center mt-8">
                <Button onClick={resetQuiz} variant="outline">
                    Take the Quiz Again
                </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
