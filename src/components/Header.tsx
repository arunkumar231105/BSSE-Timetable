import React from 'react';
import { Moon, Sun, UserCircle, Search } from 'lucide-react';
import DepartmentSelector from './DepartmentSelector';
import { Department, RomanNumeral, Section, FilterState } from '../types/timetable';

interface HeaderProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSearch: () => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  onDeveloperInfo: () => void;
}

export default function Header({
  filters,
  onFilterChange,
  onSearch,
  isDarkMode,
  onDarkModeToggle,
  onDeveloperInfo
}: HeaderProps) {
  return (
    <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            SZABIST University Timetable
          </h1>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <DepartmentSelector
                department={filters.department}
                semester={filters.semester}
                section={filters.section}
                onDepartmentChange={(dept) => onFilterChange({ department: dept })}
                onSemesterChange={(sem) => onFilterChange({ semester: sem })}
                onSectionChange={(sec) => onFilterChange({ section: sec })}
                isDarkMode={isDarkMode}
              />
              
              <button
                onClick={onSearch}
                className={`min-h-[44px] px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onDarkModeToggle}
                className={`p-3 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={onDeveloperInfo}
                className={`flex-1 sm:flex-none min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <UserCircle className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">About Developer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}