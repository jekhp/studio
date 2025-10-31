"use client";

import { MessageSquare, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';

const quickQuestions = [
    {
        question: "What is the biggest festival?",
        answer: "Inti Raymi, the Festival of the Sun, is the largest and most famous theatrical representation of an ancient Inca ceremony.",
        link: "/festivals/inti-raymi"
    },
    {
        question: "When are most festivals?",
        answer: "June is a particularly busy month for festivals in Cusco, including the famous Inti Raymi and Corpus Christi.",
        link: "/calendar"
    },
    {
        question: "Can I get a recommendation?",
        answer: "Of course! Our AI Festival Finder can give you personalized suggestions based on your interests.",
        link: "/recommendations"
    }
];

export function ChatSupport() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90"
          size="icon"
          aria-label="Open Chat Support"
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='flex items-center gap-2 font-headline text-2xl'>
            <Bot className="h-6 w-6 text-primary"/>
            Virtual Assistant
          </SheetTitle>
          <SheetDescription>
            Hello! I'm here to help you explore the festivals of Cusco. Here are some quick questions you might have.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          {quickQuestions.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg bg-background">
                <p className="font-semibold text-sm">{item.question}</p>
                <p className="text-muted-foreground text-sm mt-1">{item.answer}</p>
                {item.link && (
                    <Link href={item.link} className="text-primary text-sm font-semibold mt-2 block hover:underline">
                        Learn More &rarr;
                    </Link>
                )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
