import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Department, RomanNumeral, Section } from '../types/timetable';

interface DepartmentSelectorProps {
  department: Department;
  semester: RomanNumeral;
  section: Section;
  onDepartmentChange: (department: Department) => void;
  onSemesterChange: (semester: RomanNumeral) => void;
  onSectionChange: (section: Section) => void;
  isDarkMode: boolean;
}

const departments: Department[] = ['BSSE','BSAI'];
const semesters: RomanNumeral[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const sections: Record<Department, Section[]> = {
  'BSSE': ['A', 'B', 'C', 'D'],
  'BSAI': ['A', 'B', 'C', 'D']
};

export default function DepartmentSelector({
  department,
  semester,
  section,
  onDepartmentChange,
  onSemesterChange,
  onSectionChange,
  isDarkMode
}: DepartmentSelectorProps) {
  const availableSections = sections[department];

  const selectClasses = `
    w-full min-h-[44px] appearance-none rounded-lg py-2.5 pl-4 pr-10
    text-base font-medium transition-all cursor-pointer
    ${isDarkMode
      ? 'bg-gray-700/80 border border-gray-600 text-white hover:bg-gray-600/80 focus:bg-gray-600'
      : 'bg-white/80 border border-gray-200 text-gray-900 hover:bg-white focus:bg-white'
    }
    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
  `;

  const wrapperClasses = `
    relative flex-1 min-w-[120px]
  `;

  const iconClasses = `
    absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none
    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
  `;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className={wrapperClasses}>
        <select
          value={department}
          onChange={(e) => {
            const newDept = e.target.value as Department;
            onDepartmentChange(newDept);
            if (!sections[newDept].includes(section)) {
              onSectionChange(sections[newDept][0]);
            }
          }}
          className={selectClasses}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <ChevronDown className={iconClasses} />
      </div>

      <div className={wrapperClasses}>
        <select
          value={semester}
          onChange={(e) => onSemesterChange(e.target.value as RomanNumeral)}
          className={selectClasses}
        >
          {semesters.map((sem) => (
            <option key={sem} value={sem}>Sem {sem}</option>
          ))}
        </select>
        <ChevronDown className={iconClasses} />
      </div>

      <div className={wrapperClasses}>
        <select
          value={section}
          onChange={(e) => onSectionChange(e.target.value as Section)}
          className={selectClasses}
        >
          {availableSections.map((sec) => (
            <option key={sec} value={sec}>Sec {sec}</option>
          ))}
        </select>
        <ChevronDown className={iconClasses} />
      </div>
    </div>
  );
}