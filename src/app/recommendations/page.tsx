"use client";

import { Wand2 } from "lucide-react";
import { FestivalQuiz } from "@/components/FestivalQuiz";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground flex items-center justify-center gap-3">
          <Wand2 className="h-10 w-10 text-primary" />
          Festival Finder Quiz
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Responde unas pocas preguntas y encontraremos el festival perfecto para ti en Cusco.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <FestivalQuiz />
      </div>
    </div>
  );
}
