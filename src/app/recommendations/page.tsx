"use client";

import * as React from "react";
import { Wand2, Sparkles, BrainCircuit, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getFestivalRecommendations } from "@/ai/flows/festival-recommendation";
import { festivals, type Festival } from "@/lib/festivals";
import { FestivalCard } from "@/components/FestivalCard";
import { Label } from "@/components/ui/label";


export default function RecommendationsPage() {
  const [interests, setInterests] = React.useState('');
  const [preferences, setPreferences] = React.useState('');
  const [recommendationResult, setRecommendationResult] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGetRecommendations = async () => {
    if (!interests && !preferences) return;
    setIsLoading(true);
    setRecommendationResult(null);

    try {
      const result = await getFestivalRecommendations({ interests, preferences });
      setRecommendationResult(result.recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setRecommendationResult("I'm sorry, I encountered an error while generating recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setInterests('');
    setPreferences('');
    setRecommendationResult(null);
    setIsLoading(false);
  };
  
  // A simple function to find festival slugs mentioned in the text
  const findFestivalsInText = (text: string): Festival[] => {
    if (!text) return [];
    const mentionedFestivals: Festival[] = [];
    festivals.forEach(festival => {
      const festivalNameRegex = new RegExp(festival.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
      if (festivalNameRegex.test(text)) {
        if (!mentionedFestivals.some(f => f.id === festival.id)) {
            mentionedFestivals.push(festival);
        }
      }
    });
    return mentionedFestivals;
  }

  const recommendedFestivals = findFestivalsInText(recommendationResult || '');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground flex items-center justify-center gap-3">
          <Wand2 className="h-10 w-10 text-primary" />
          AI Festival Finder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Describe your perfect trip, and our AI assistant will find the best festivals for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {!recommendationResult && !isLoading ? (
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-6 w-6 text-primary"/>
                    Tell me about your ideal trip
                </CardTitle>
                <CardDescription>The more details you provide, the better the recommendations!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="interests">What are your interests?</Label>
                    <Textarea 
                        id="interests"
                        placeholder="e.g., 'I love historical reenactments, traditional music, and trying new foods.'"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        rows={3}
                    />
                     <p className="text-xs text-muted-foreground">Examples: music, dance, history, food, adventure, spirituality.</p>
                </div>
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="preferences">Do you have any preferences?</Label>
                    <Textarea 
                        id="preferences"
                        placeholder="e.g., 'I'm traveling in June with a small budget and I'd love something authentic, off the beaten path.'"
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        rows={3}
                    />
                    <p className="text-xs text-muted-foreground">Examples: travel dates, budget, crowd size, accessibility.</p>
                </div>
              <Button onClick={handleGetRecommendations} disabled={!interests && !preferences} className="w-full bg-primary text-primary-foreground">
                <Sparkles className="mr-2 h-4 w-4"/>
                Get AI Recommendations
              </Button>
            </CardContent>
          </Card>
        ) : isLoading ? (
            <Card className="text-center">
                <CardContent className="p-8">
                    <div className="flex justify-center items-center gap-3 text-muted-foreground">
                        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                        <p className="text-lg">Our AI is finding the perfect festivals for you...</p>
                    </div>
                </CardContent>
            </Card>
        ) : (
          <div>
            <h2 className="text-3xl font-headline text-center mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary"/>
              Your Personal Recommendations
            </h2>
            
            <Card className="mb-8 bg-secondary border-primary/20">
                <CardContent className="p-6">
                    <p className="text-foreground">{recommendationResult}</p>
                </CardContent>
            </Card>

            {recommendedFestivals.length > 0 ? (
                <div className="space-y-8">
                    {recommendedFestivals.map(festival => (
                        <FestivalCard key={festival.id} festival={festival} />
                    ))}
                </div>
            ) : (
                <Card className="text-center">
                    <CardContent className="p-8">
                        <PartyPopper className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                        <p className="text-muted-foreground">The AI provided a great suggestion, but didn't pinpoint a specific festival from our list.</p>
                        <p className="text-sm text-muted-foreground mt-2">Try being more specific with your interests or check out the full <a href="/festivals" className="text-primary hover:underline">list of festivals</a>!</p>
                    </CardContent>
                </Card>
            )}
            <div className="text-center mt-8">
                <Button onClick={resetQuiz} variant="outline">
                    Start Over
                </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
