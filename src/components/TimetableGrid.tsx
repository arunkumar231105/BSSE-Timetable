import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Clock, GraduationCap, User } from 'lucide-react';
import { Department, RomanNumeral, Section, Day, TimeSlot } from '../types/timetable';
import { timetableData } from '../data/timetableData';

interface TimetableGridProps {
  department: Department;
  semester: RomanNumeral;
  section: Section;
  selectedDay: Day | null;
  isDarkMode: boolean;
}

const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  '8:00-10:00',
  '8:00-10:30',
  '8:00-11:00',
  '8:00-1:00',
  '8:30-10:30',
  '9:00-11:00',
  '9:00-12:00',
  '10:00-12:00',
  '10:00-1:00',
  '10:30-12:30',
  '10:30-1:00',
  '10:45-1:15',
  '11:30-1:30',
  '11:30-2:30',
  '12:30-2:30',
  '1:00-3:00',
  '1:15-4:15',
  '1:30-4:00',
  '1:30-3:30',
  '3:00-5:00',
  '3:00-6:00',
  '3:45-6:15',
  '4:00-6:00',
  '4:00-6:30',
  '6:30-9:30'
];




export default function TimetableGrid({
  department,
  semester,
  section,
  selectedDay,
  isDarkMode
}: TimetableGridProps) {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as Day;
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: false });
  const currentTimeSlot = timeSlots.find(slot => {
    const [start] = slot.split('-');
    const [startHour] = start.split(':');
    return parseInt(startHour) === parseInt(currentTime);
  });

  const filteredDays = selectedDay ? [selectedDay] : days;

  const timetable = timetableData.find(
    data => 
      data.department === department && 
      data.semester === semester && 
      data.section === section
  );

  const getCourseForTimeSlot = (day: Day, timeSlot: string) => {
    if (!timetable) return null;
    return timetable.schedule.find(entry => entry.day === day && entry.timeSlot === timeSlot);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Mobile View */}
      <div className="block lg:hidden">
        {filteredDays.map(day => (
          <div 
            key={day}
            className={`mb-6 last:mb-0 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-3 px-4 ${
              day === currentDay ? 'text-blue-600' : ''
            }`}>
              {day}
            </h3>
            <div className="space-y-3">
              {timeSlots.map(timeSlot => {
                const courseEntry = getCourseForTimeSlot(day, timeSlot);
                return (
                  <div
                    key={`${day}-${timeSlot}`}
                    className={`mx-4 p-4 rounded-lg ${
                      courseEntry
                        ? isDarkMode
                          ? 'bg-blue-900/30 ring-1 ring-blue-500/50'
                          : 'bg-blue-50 ring-1 ring-blue-500/30'
                        : isDarkMode
                          ? 'bg-gray-800/50'
                          : 'bg-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{timeSlot}</span>
                    </div>
                    {courseEntry && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-blue-500 shrink-0" />
                          <span className="text-sm font-medium">{courseEntry.course.name}</span>
                        </div>
                        {courseEntry.course.instructor && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-blue-500 shrink-0" />
                            <span className="text-sm">{courseEntry.course.instructor}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className={isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/80'}>
              <th className={`sticky left-0 px-6 py-4 ${
                isDarkMode ? 'bg-gray-900/50 text-white' : 'bg-gray-50/80 text-gray-900'
              }`}>
                <div className="font-semibold">Time</div>
              </th>
              {filteredDays.map(day => (
                <th key={day} className={`px-6 py-4 text-left ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className="font-semibold">{day}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, index) => (
              <tr key={timeSlot} className={`
                transition-colors duration-150
                ${index % 2 === 0 
                  ? isDarkMode ? 'bg-gray-800/30' : 'bg-white/50'
                  : isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50/30'
                }
                hover:${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50/30'}
              `}>
                <td className={`sticky left-0 px-6 py-4 ${
                  isDarkMode 
                    ? index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/50'
                    : index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
                }`}>
                  <div className="flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {timeSlot}
                    </span>
                  </div>
                </td>
                {filteredDays.map(day => {
                  const courseEntry = getCourseForTimeSlot(day, timeSlot);
                  return (
                    <td key={`${day}-${timeSlot}`} className="px-6 py-4">
                      <div className={`
                        flex flex-col gap-2 p-3 rounded-lg transition-all duration-200
                        ${courseEntry
                          ? isDarkMode 
                            ? 'bg-blue-900/30 ring-1 ring-blue-500/50' 
                            : 'bg-blue-50 ring-1 ring-blue-500/30'
                          : ''
                        }
                        hover:${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50/50'}
                      `}>
                        {courseEntry && (
                          <>
                            <div className="flex items-center gap-2">
                              <GraduationCap className={`h-4 w-4 shrink-0 ${
                                isDarkMode ? 'text-blue-400' : 'text-blue-500'
                              }`} />
                              <span className={`text-sm font-medium truncate ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-900'
                              }`}>
                                {courseEntry.course.name}
                              </span>
                            </div>
                            {courseEntry.course.instructor && (
                              <div className="flex items-center gap-2">
                                <User className={`h-4 w-4 shrink-0 ${
                                  isDarkMode ? 'text-blue-400' : 'text-blue-500'
                                }`} />
                                <span className={`text-sm truncate ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {courseEntry.course.instructor}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}