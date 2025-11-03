"use client";

import { Wand2 } from "lucide-react";
import { FestivalQuiz } from "@/components/FestivalQuiz";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function RecommendationsPage() {
  const char1 = PlaceHolderImages.find(p => p.id === 'quiz-character-1');
  const char2 = PlaceHolderImages.find(p => p.id === 'quiz-character-2');

  return (
    <div className="container mx-auto px-4 py-16 overflow-hidden">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground flex items-center justify-center gap-3">
          <Wand2 className="h-10 w-10 text-primary" />
          Festival Finder Quiz
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Responde unas pocas preguntas y encontraremos el festival perfecto para ti en Cusco.
        </p>
      </div>

      <div className="relative">
        {char1 && (
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-24 2xl:-left-32 w-[250px] h-[400px] opacity-80">
                 <Image 
                    src={char1.imageUrl}
                    alt={char1.description}
                    fill
                    className="object-contain"
                    data-ai-hint={char1.imageHint}
                 />
            </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <FestivalQuiz />
        </div>

        {char2 && (
             <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-24 2xl:-right-32 w-[250px] h-[400px] opacity-80">
                 <Image 
                    src={char2.imageUrl}
                    alt={char2.description}
                    fill
                    className="object-contain"
                    data-ai-hint={char2.imageHint}
                 />
            </div>
        )}
      </div>
    </div>
  );
}
