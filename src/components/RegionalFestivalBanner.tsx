
"use client";

import Link from 'next/link';
import type { Festival } from '@/lib/festivals';
import { Countdown } from './Countdown';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/context/language-context';

export function RegionalFestivalBanner({ festival }: { festival: Festival }) {
    const { t } = useLanguage();

    return (
        <Link href={`/festivals/${festival.slug}`} className="block group">
            <div className="notification-banner group-hover:scale-105 transition-transform duration-300">
                <div className="notification-header">
                    <div className="notification-title">
                        <Bell className="mr-2 h-4 w-4" />
                        Próxima Fiesta Regional
                    </div>
                </div>

                <div className="notification-content">
                    <p className="notification-message">
                        ¡La celebración de <strong>{festival.name}</strong> está por comenzar en todo Cusco!
                    </p>

                    <div className="notification-time">
                        <Countdown targetDate={festival.date.start} />
                    </div>

                    <div className="notification-actions">
                         <Button className="action-btn btn-primary w-full">Ver detalles</Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Add styles to a global stylesheet or a styled-jsx block if preferred.
// For this case, we add it to globals.css
