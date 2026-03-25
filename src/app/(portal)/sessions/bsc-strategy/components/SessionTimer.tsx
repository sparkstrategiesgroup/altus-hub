/**
 * Session Timer Component - BSC Strategy Session
 * 45-minute countdown timer with visual progress
 * Altus design: cyan accent (#5DADE2), professional styling
 */

'use client';

import { useState, useEffect } from 'react';

interface SessionTimerProps {
  durationMinutes?: number;
  onSessionEnd?: () => void;
}

export default function SessionTimer({ durationMinutes = 45, onSessionEnd }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onSessionEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onSessionEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100;

  const toggleTimer = () => setIsRunning(!isRunning);

  return (
    <div className="fixed top-20 right-4 md:right-8 z-40 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
      <div className="text-center mb-4">
        <div className="text-4xl font-bold font-mono mb-2" style={{ color: '#5DADE2' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-sm text-gray-600">Session Time Remaining</p>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-1000"
            style={{ width: `${progress}%`, backgroundColor: '#5DADE2' }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">{Math.round(progress)}% Complete</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleTimer}
          className="flex-1 px-3 py-2 text-gray-900 font-semibold rounded-lg hover:opacity-80 transition-opacity text-sm"
          style={{ backgroundColor: '#5DADE2' }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setTimeLeft(durationMinutes * 60);
            setIsRunning(false);
          }}
          className="flex-1 px-3 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm"
        >
          Reset
        </button>
      </div>

      {timeLeft < 300 && timeLeft > 0 && (
        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
          ⏰ {timeLeft < 60 ? 'Less than 1 minute' : 'Less than 5 minutes'} remaining
        </div>
      )}

      {timeLeft === 0 && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
          ✓ Session time complete
        </div>
      )}
    </div>
  );
}
