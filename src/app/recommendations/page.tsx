"use client";

import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wand2, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { getFestivalRecommendations } from "@/ai/flows/festival-recommendation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  interests: z.string().min(3, "Please tell us at least one interest."),
  preferences: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      preferences: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await getFestivalRecommendations(data);
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        title: "Error",
        description: "Sorry, we couldn't generate recommendations at this time. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground flex items-center justify-center gap-3">
          <Wand2 className="h-10 w-10 text-primary" />
          AI Festival Finder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Not sure where to start? Describe your interests, and our AI will suggest the perfect Cusco festivals for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Your Interests</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., electronic music, traditional dance, history, street food" {...field} />
                      </FormControl>
                      <FormDescription>
                        List a few things you enjoy, separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Preferences (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., traveling in June, on a budget, looking for family-friendly events" {...field} />
                      </FormControl>
                      <FormDescription>
                        Add any other details like travel dates, budget, or specific needs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Get Recommendations"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center mt-8">
            <Loader2 className="mx-auto h-8 w-8 text-primary animate-spin" />
            <p className="text-muted-foreground mt-2">Our AI is curating your personal festival guide...</p>
          </div>
        )}

        {recommendations && (
          <div className="mt-12">
            <h2 className="text-3xl font-headline text-center mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary"/>
              Your Personal Recommendations
            </h2>
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                  {recommendations}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
