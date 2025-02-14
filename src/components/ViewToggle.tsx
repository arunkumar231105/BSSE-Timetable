import React from 'react';
import { Calendar, FileText } from 'lucide-react';

interface ViewToggleProps {
  view: 'classes' | 'exams';
  onViewChange: (view: 'classes' | 'exams') => void;
  isDarkMode: boolean;
}

export default function ViewToggle({ view, onViewChange, isDarkMode }: ViewToggleProps) {
  return (
    <div className={`inline-flex rounded-lg p-1 ${
      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
    }`}>
      <button
        onClick={() => onViewChange('classes')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          view === 'classes'
            ? 'bg-blue-600 text-white'
            : isDarkMode
              ? 'text-gray-300 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Calendar className="h-4 w-4" />
        Classes
      </button>
      
      <button
        onClick={() => onViewChange('exams')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          view === 'exams'
            ? 'bg-blue-600 text-white'
            : isDarkMode
              ? 'text-gray-300 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <FileText className="h-4 w-4" />
        Exams
      </button>
    </div>
  );
}