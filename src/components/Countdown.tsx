
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
    <div className="flex justify-around text-center items-baseline gap-4">
      {totalHoursLeft > 48 ? (
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">{timeLeft.days}</span>
          <span className="text-xs text-amber-300/70">Días</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">{timeLeft.days}</span>
            <span className="text-xs text-amber-300/70">Días</span>
          </div>
          <div className="text-2xl font-light text-amber-300/50">:</div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">{timeLeft.hours}</span>
            <span className="text-xs text-amber-300/70">Horas</span>
          </div>
        </>
      )}
    </div>
  );
};
