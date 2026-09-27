import { useState, useEffect, useCallback } from 'react';

// ──────────────────────────────────────────────
// useCountdown — returns { days, hours, minutes, seconds, isComplete }
// targetDate: ISO date string e.g. "2026-12-19T19:30:00"
// ──────────────────────────────────────────────
export default function useCountdown(targetDate) {
  const calculateTimeLeft = useCallback(() => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };

    return {
      days:       Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:      Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes:    Math.floor((diff / (1000 * 60)) % 60),
      seconds:    Math.floor((diff / 1000) % 60),
      isComplete: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
}
