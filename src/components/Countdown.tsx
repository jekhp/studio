
"use client";

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const totalHours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        setTimeLeft({ days, hours });
      } else {
        setTimeLeft({ days: 0, hours: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, [targetDate]);

  const totalHoursLeft = timeLeft.days * 24 + timeLeft.hours;

  if (totalHoursLeft <= 0) {
    return <div className="text-sm font-semibold text-green-400">¡YA COMENZÓ!</div>;
  }

  return (
    <div className="flex items-baseline gap-2 text-sm">
        <div className="flex items-baseline">
          <span className="font-bold text-white">{timeLeft.days}</span>
          <span className="text-xs text-primary-foreground/80">d</span>
        </div>
        <div className="flex items-baseline">
            <span className="font-bold text-white">{timeLeft.hours}</span>
            <span className="text-xs text-primary-foreground/80">h</span>
        </div>
    </div>
  );
};
