import { useState, useEffect } from 'react';

export const useTimer = (targetTime, onComplete = null) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    const updateTimer = () => {
      const now = new Date().getTime();
      const target = typeof targetTime === 'function' ? targetTime() : targetTime;
      
      if (target) {
        const difference = target - now;
        
        if (difference > 0) {
          setTimeLeft(difference);
          setIsActive(true);
        } else {
          setTimeLeft(0);
          setIsActive(false);
          if (onComplete) {
            onComplete();
          }
        }
      } else {
        setTimeLeft(0);
        setIsActive(false);
      }
    };

    updateTimer(); // Initial call
    
    if (isActive) {
      interval = setInterval(updateTimer, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [targetTime, isActive, onComplete]);

  return {
    timeLeft,
    isActive,
    hours: Math.floor(timeLeft / (1000 * 60 * 60)),
    minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
  };
};
