// filepath: hooks/use-countdown.ts
import { useState, useEffect, useRef } from 'react';

export function useCountdown(targetTimestamp: number | null, onEnd: () => void) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  
  // Use a ref to hold the onEnd callback. This ensures the interval
  // always calls the LATEST version of the function without needing to
  // be in the useEffect dependency array.
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  useEffect(() => {
    if (!targetTimestamp) {
      setTimeRemaining(0);
      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, targetTimestamp - Date.now());
      setTimeRemaining(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
        onEndRef.current(); // Call the latest callback from the ref
      }
    }, 1000);

    // Set the initial time immediately to prevent a 1-second delay
    const initialRemaining = Math.max(0, targetTimestamp - Date.now());
    setTimeRemaining(initialRemaining);
    if (initialRemaining === 0) {
      clearInterval(interval);
      onEndRef.current();
    }

    return () => clearInterval(interval);
    // CRITICAL: The dependency array now only contains targetTimestamp.
    // This is stable and will not cause an infinite loop.
  }, [targetTimestamp]);

  const minutes = Math.floor(timeRemaining / 1000 / 60);
  const seconds = Math.floor((timeRemaining / 1000) % 60);

  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
}