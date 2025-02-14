import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Semester, Section } from '../types/timetable';

interface TimetableSelectorProps {
  semester: Semester;
  section: Section;
  onSemesterChange: (semester: Semester) => void;
  onSectionChange: (section: Section) => void;
  onSubmit: () => void;
  isDarkMode: boolean;
}

const bsseSemesters = [
  'BSSE-I', 'BSSE-II', 'BSSE-III', 'BSSE-IV',
  'BSSE-V', 'BSSE-VI', 'BSSE-VII', 'BSSE-VIII'
] as const;

const bscsSemesters = [
  'BSCS-I', 'BSCS-II', 'BSCS-III', 'BSCS-IV',
  'BSCS-V', 'BSCS-VI', 'BSCS-VII', 'BSCS-VIII'
] as const;

const allSemesters = [...bsseSemesters, ...bscsSemesters];

const bsseSections = ['A', 'B', 'C', 'D'] as const;
const bscsSections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'] as const;

export default function TimetableSelector({
  semester,
  section,
  onSemesterChange,
  onSectionChange,
  onSubmit,
  isDarkMode
}: TimetableSelectorProps) {
  const isBSCS = semester.startsWith('BSCS');
  const availableSections = isBSCS ? bscsSections : bsseSections;

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                id="semester"
                value={semester}
                onChange={(e) => onSemesterChange(e.target.value as Semester)}
                className={`appearance-none block w-40 rounded-md py-2 pl-3 pr-10 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300 text-gray-900'
                } focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
              >
                <optgroup label="BSSE">
                  {bsseSemesters.map((sem) => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </optgroup>
                <optgroup label="BSCS">
                  {bscsSemesters.map((sem) => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className={`absolute right-2 top-2.5 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } pointer-events-none`} />
            </div>

            <div className="relative">
              <select
                id="section"
                value={section}
                onChange={(e) => onSectionChange(e.target.value as Section)}
                className={`appearance-none block w-32 rounded-md py-2 pl-3 pr-10 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300 text-gray-900'
                } focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
              >
                {availableSections.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-2 top-2.5 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } pointer-events-none`} />
            </div>

            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Show Timetable
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}