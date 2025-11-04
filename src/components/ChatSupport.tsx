"use client";

import { Bot, Star, Wand2, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function ChatSupport() {
  const { t } = useLanguage();

  const faqSections = [
    {
        title: t('chatFaqPopularTitle'),
        icon: Star,
        questions: [
            {
                question: t('chatFaqPopularQ1'),
                answer: t('chatFaqPopularA1'),
                link: "/festivals/inti-raymi",
                linkLabel: t('chatFaqPopularL1')
            },
            {
                question: t('chatFaqPopularQ2'),
                answer: t('chatFaqPopularA2'),
                link: "/calendar",
                linkLabel: t('chatFaqPopularL2')
            },
        ]
    },
    {
        title: t('chatFaqQuizTitle'),
        icon: Wand2,
        questions: [
            {
                question: t('chatFaqQuizQ1'),
                answer: t('chatFaqQuizA1'),
                link: "/recommendations",
                linkLabel: t('chatFaqQuizL1')
            },
             {
                question: t('chatFaqQuizQ2'),
                answer: t('chatFaqQuizA2'),
                link: "/festivals/qoyllur-riti",
                linkLabel: t('chatFaqQuizL2')
            },
        ]
    },
    {
        title: t('chatFaqPlanningTitle'),
        icon: MapIcon,
        questions: [
            {
                question: t('chatFaqPlanningQ1'),
                answer: t('chatFaqPlanningA1'),
                link: "/map",
                linkLabel: t('chatFaqPlanningL1')
            },
            {
                question: t('chatFaqPlanningQ2'),
                answer: t('chatFaqPlanningA2'),
                link: "/calendar",
                linkLabel: t('chatFaqPlanningL2')
            },
        ]
    }
];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 z-50"
          size="icon"
          aria-label="Open Chat Support"
        >
          <Bot className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className='flex items-center gap-2 font-headline text-2xl'>
            <Bot className="h-6 w-6 text-primary"/>
            {t('chatTitle')}
          </SheetTitle>
          <SheetDescription>
            {t('chatDescription')}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-2 overflow-y-auto flex-grow px-6">
          <Accordion type="single" collapsible className="w-full">
            {faqSections.map((section, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="font-semibold text-base hover:no-underline">
                    <div className="flex items-center gap-2">
                        <section.icon className="h-5 w-5 text-primary"/>
                        {section.title}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 pt-2">
                        {section.questions.map((item, qIndex) => (
                           <div key={qIndex} className="p-4 border rounded-lg bg-background text-left">
                                <p className="font-semibold text-sm">{item.question}</p>
                                <p className="text-muted-foreground text-sm mt-1">{item.answer}</p>
                                {item.link && (
                                    <Button asChild variant="link" size="sm" className="p-0 h-auto mt-2">
                                        <Link href={item.link}>
                                            {item.linkLabel} &rarr;
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}
