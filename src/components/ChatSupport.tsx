"use client";

import { MessageSquare, Bot, Wand2, Calendar, Map, Star } from 'lucide-react';
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

const faqSections = [
    {
        title: "Popular Questions",
        icon: Star,
        questions: [
            {
                question: "What is the biggest festival in Cusco?",
                answer: "Inti Raymi, the Festival of the Sun, is the largest and most famous theatrical reenactment of an ancient Inca ceremony.",
                link: "/festivals/inti-raymi",
                linkLabel: "Discover Inti Raymi"
            },
            {
                question: "Which month has the most festivals?",
                answer: "June is a particularly busy month for festivals in Cusco, including the famous Inti Raymi and Corpus Christi.",
                link: "/calendar",
                linkLabel: "View June Calendar"
            },
        ]
    },
    {
        title: "Which festival is for me?",
        icon: Wand2,
        questions: [
            {
                question: "I don't know where to start! Can you help?",
                answer: "Of course! Our Festival Finder quiz will ask you a few questions to give you personalized recommendations based on your interests.",
                link: "/recommendations",
                linkLabel: "Take the Quiz"
            },
             {
                question: "I'm looking for a deep spiritual experience.",
                answer: "We recommend Qoyllur Rit'i or the pilgrimage to the Lord of Huanca, both are powerful experiences of faith and devotion.",
                link: "/festivals/qoyllur-riti",
                linkLabel: "Explore Qoyllur Rit'i"
            },
        ]
    },
    {
        title: "Planning My Visit",
        icon: Map,
        questions: [
            {
                question: "Can I see all the festivals on a map?",
                answer: "Yes, on our Map page you can see the location of all the festivals to better plan your route.",
                link: "/map",
                linkLabel: "Go to the Map"
            },
            {
                question: "How can I find out the exact dates?",
                answer: "Our interactive Calendar allows you to explore festivals by date and see what's happening each day.",
                link: "/calendar",
                linkLabel: "Check the Calendar"
            },
        ]
    }
];

export function ChatSupport() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
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
            Virtual Assistant
          </SheetTitle>
          <SheetDescription>
            Hello! I'm here to help you explore the festivals of Cusco. Find answers to common questions below.
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
