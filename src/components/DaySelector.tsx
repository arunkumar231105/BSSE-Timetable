import React from 'react';
import { Day } from '../types/timetable';

interface DaySelectorProps {
  selectedDay: Day | null;
  onDaySelect: (day: Day | null) => void;
  isDarkMode: boolean;
}

const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DaySelector({ selectedDay, onDaySelect, isDarkMode }: DaySelectorProps) {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as Day;

  return (
    <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <div className="grid grid-cols-3 sm:flex gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onDaySelect(day === selectedDay ? null : day)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              day === selectedDay
                ? isDarkMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : isDarkMode
                ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80 backdrop-blur-sm'
                : 'bg-white/80 text-gray-600 hover:bg-white backdrop-blur-sm'
            }`}
          >
            {window.innerWidth < 640 ? day.slice(0, 3) : day}
          </button>
        ))}
      </div>

      {selectedDay && (
        <button
          onClick={() => onDaySelect(null)}
          className={`w-full sm:w-auto text-sm px-4 py-2 rounded-lg font-medium transition-all ${
            isDarkMode
              ? 'bg-gray-700/80 text-blue-400 hover:bg-gray-600/80 backdrop-blur-sm'
              : 'bg-white/80 text-blue-600 hover:bg-white backdrop-blur-sm'
          }`}
        >
          View All Days
        </button>
      )}
    </div>
  );
}