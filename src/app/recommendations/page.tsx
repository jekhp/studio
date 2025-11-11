"use client";

import { Wand2 } from "lucide-react";
import { FestivalQuiz } from "@/components/FestivalQuiz";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";

export default function RecommendationsPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 overflow-hidden">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground flex items-center justify-center gap-3">
          <Wand2 className="h-10 w-10 text-primary" />
          {t('ui.recommendations.title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('ui.recommendations.subtitle')}
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-24 2xl:-left-32 w-[250px] h-[400px] opacity-80">
            <Image 
                src="/images/cuyperfil.webp"
                alt="CuscoFest Cuy"
                fill
                className="object-contain"
                data-ai-hint="guinea pig character"
            />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <FestivalQuiz />
        </div>

        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-24 2xl:-right-32 w-[250px] h-[400px] opacity-80">
            <Image 
                src="/images/cuyperfil.webp"
                alt="CuscoFest Cuy"
                fill
                className="object-contain scale-x-[-1]"
                data-ai-hint="guinea pig character"
            />
        </div>
      </div>
    </div>
  );
}
