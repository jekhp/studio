
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/context/language-context';
import { Separator } from '../ui/separator';

const navLinks = [
  { href: '/', label: 'ui.nav.home' },
  { href: '/festivals', label: 'ui.nav.festivals' },
  { href: '/calendar', label: 'ui.nav.calendar' },
  { href: '/map', label: 'ui.nav.map' },
  { href: '/recommendations', label: 'ui.nav.recommendations' },
];

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {t(link.label)}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.webp" alt="CuscoFest Logo" width={24} height={24} className="h-6 w-6" />
          <span className="font-bold font-headline text-xl">CuscoFest</span>
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
          <NavLinks />
          <LanguageSwitcher />
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex-grow">
                <div className="flex flex-col space-y-4 pt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === link.href ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {t(link.label)}
                    </Link>
                  ))}
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-center pb-4">
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
