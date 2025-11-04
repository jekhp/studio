
"use client";

import Link from 'next/link';
import type { Festival } from '@/lib/festivals';
import { Countdown } from './Countdown';
import { Bell } from 'lucide-react';

export function RegionalFestivalBanner({ festival }: { festival: Festival }) {
    return (
        <Link href={`/festivals/${festival.slug}`} className="block group">
            <div className="notification-banner group-hover:scale-105 transition-transform duration-300 p-3">
                <div className="flex justify-between items-center w-full">
                    <div className="notification-title !p-0 !border-none">
                        <Bell className="mr-2 h-4 w-4" />
                        <span className="font-semibold text-sm">Próxima Fiesta Regional</span>
                    </div>
                    <div className="notification-time">
                        <Countdown targetDate={festival.date.start} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
