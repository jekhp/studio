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
        title: "Preguntas Populares",
        icon: Star,
        questions: [
            {
                question: "¿Cuál es el festival más grande de Cusco?",
                answer: "Inti Raymi, el Festival del Sol, es la representación teatral más grande y famosa de una antigua ceremonia inca.",
                link: "/festivals/inti-raymi",
                linkLabel: "Descubre Inti Raymi"
            },
            {
                question: "¿En qué mes hay más festivales?",
                answer: "Junio es un mes particularmente ocupado para los festivales en Cusco, incluyendo los famosos Inti Raymi y Corpus Christi.",
                link: "/calendar",
                linkLabel: "Ver Calendario de Junio"
            },
        ]
    },
    {
        title: "¿Qué festival es para mí?",
        icon: Wand2,
        questions: [
            {
                question: "¡No sé por dónde empezar! ¿Pueden ayudarme?",
                answer: "¡Claro! Nuestro Buscador de Festivales te hará algunas preguntas para darte recomendaciones personalizadas basadas en tus intereses.",
                link: "/recommendations",
                linkLabel: "Hacer el Quiz"
            },
             {
                question: "Busco una experiencia espiritual profunda.",
                answer: "Te recomendamos Qoyllur Rit'i o la peregrinación al Señor de Huanca, ambas son experiencias de fe y devoción muy poderosas.",
                link: "/festivals/qoyllur-riti",
                linkLabel: "Explorar Qoyllur Rit'i"
            },
        ]
    },
    {
        title: "Planificando mi visita",
        icon: Map,
        questions: [
            {
                question: "¿Puedo ver todos los festivales en un mapa?",
                answer: "Sí, en nuestra página de Mapa puedes ver la ubicación de todos los festivales para planificar mejor tu ruta.",
                link: "/map",
                linkLabel: "Ir al Mapa"
            },
            {
                question: "¿Cómo puedo saber las fechas exactas?",
                answer: "Nuestro Calendario Interactivo te permite explorar los festivales por fecha y ver qué se celebra cada día.",
                link: "/calendar",
                linkLabel: "Consultar el Calendario"
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
            <Wand2 className="h-6 w-6 text-primary"/>
            Asistente Virtual
          </SheetTitle>
          <SheetDescription>
            ¡Hola! Estoy aquí para ayudarte a explorar los festivales de Cusco. Encuentra respuestas a preguntas comunes a continuación.
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