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
        title: t('ui.chat.faq.popular.title'),
        icon: Star,
        questions: [
            {
                question: t('ui.chat.faq.popular.q1_question'),
                answer: t('ui.chat.faq.popular.q1_answer'),
                link: "/festivals/inti-raymi",
                linkLabel: t('ui.chat.faq.popular.q1_link')
            },
            {
                question: t('ui.chat.faq.popular.q2_question'),
                answer: t('ui.chat.faq.popular.q2_answer'),
                link: "/calendar",
                linkLabel: t('ui.chat.faq.popular.q2_link')
            },
        ]
    },
    {
        title: t('ui.chat.faq.quiz.title'),
        icon: Wand2,
        questions: [
            {
                question: t('ui.chat.faq.quiz.q1_question'),
                answer: t('ui.chat.faq.quiz.q1_answer'),
                link: "/recommendations",
                linkLabel: t('ui.chat.faq.quiz.q1_link')
            },
             {
                question: t('ui.chat.faq.quiz.q2_question'),
                answer: t('ui.chat.faq.quiz.q2_answer'),
                link: "/festivals/qoyllur-riti",
                linkLabel: t('ui.chat.faq.quiz.q2_link')
            },
        ]
    },
    {
        title: t('ui.chat.faq.planning.title'),
        icon: MapIcon,
        questions: [
            {
                question: t('ui.chat.faq.planning.q1_question'),
                answer: t('ui.chat.faq.planning.q1_answer'),
                link: "/map",
                linkLabel: t('ui.chat.faq.planning.q1_link')
            },
            {
                question: t('ui.chat.faq.planning.q2_question'),
                answer: t('ui.chat.faq.planning.q2_answer'),
                link: "/calendar",
                linkLabel: t('ui.chat.faq.planning.q2_link')
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
            {t('ui.chat.title')}
          </SheetTitle>
          <SheetDescription>
            {t('ui.chat.description')}
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
