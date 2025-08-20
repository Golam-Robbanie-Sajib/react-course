// filepath: hooks/use-countdown.ts
import { useState, useEffect } from 'react';

export function useCountdown(targetTimestamp: number | null, onEnd: () => void) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    if (!targetTimestamp) return;

    // Set initial time remaining immediately
    const initialRemaining = Math.max(0, targetTimestamp - Date.now());
    setTimeRemaining(initialRemaining);
    if (initialRemaining === 0) {
      onEnd();
    }

    // Update the countdown every second
    const interval = setInterval(() => {
      const remaining = Math.max(0, targetTimestamp - Date.now());
      setTimeRemaining(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        onEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp, onEnd]);

  const minutes = Math.floor(timeRemaining / 1000 / 60);
  const seconds = Math.floor((timeRemaining / 1000) % 60);

  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
}