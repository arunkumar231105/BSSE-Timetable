import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ViewToggle from './components/ViewToggle';
import DaySelector from './components/DaySelector';
import TimetableGrid from './components/TimetableGrid';
import DeveloperModal from './components/DeveloperModal';
import { FilterState } from './types/timetable';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [showTimetable, setShowTimetable] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    department: 'BSSE',
    semester: 'II',
    section: 'A',
    selectedDay: null,
    view: 'classes'
  });

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    if ('department' in newFilters || 'semester' in newFilters || 'section' in newFilters) {
      setShowTimetable(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    setShowTimetable(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}>
      <Header
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        onDeveloperInfo={() => setIsDeveloperModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showTimetable ? (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <ViewToggle
                view={filters.view}
                onViewChange={(view) => handleFilterChange({ view })}
                isDarkMode={isDarkMode}
              />

              <DaySelector
                selectedDay={filters.selectedDay}
                onDaySelect={(day) => handleFilterChange({ selectedDay: day })}
                isDarkMode={isDarkMode}
              />
            </div>

            <div className={`backdrop-blur-sm rounded-xl shadow-xl ${
              isDarkMode 
                ? 'bg-gray-800/50 border border-gray-700/50' 
                : 'bg-white/60 border border-gray-200/50'
            }`}>
              {filters.view === 'classes' ? (
                <TimetableGrid
                  department={filters.department}
                  semester={filters.semester}
                  section={filters.section}
                  selectedDay={filters.selectedDay}
                  isDarkMode={isDarkMode}
                />
              ) : (
                <div className={`rounded-lg p-8 text-center ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p className="text-lg">Exam schedule will be available soon.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={`flex items-center justify-center h-[60vh] ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p className="text-lg">Select department, semester, and section, then click Search to view the timetable.</p>
          </div>
        )}
      </main>

      <footer className={`mt-8 py-6 ${
        isDarkMode 
          ? 'bg-gray-800/80 backdrop-blur-sm border-t border-gray-700' 
          : 'bg-white/80 backdrop-blur-sm border-t border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              SZABIST University Timetable Management System
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              © 2025 Arun Kumar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}