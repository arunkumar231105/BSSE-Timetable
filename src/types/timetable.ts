export type Department = 'BSSE' | 'BSAI';
export type TimeSlot = string;
export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type RomanNumeral = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII';
export type Section = 'A' | 'B' | 'C' | 'D';

export type ClassType = 'Lecture' | 'Lab' | 'Tutorial';

export interface Course {
  name: string;
  code: string;
  instructor: string;
  room: string;
  type: ClassType;
}

export interface ScheduleEntry {
  day: Day;
  timeSlot: TimeSlot;
  course: Course;
}

export interface ExamSchedule {
  date: string;
  timeSlot: string;
  courseCode: string;
  courseName: string;
  room: string;
  invigilator: string;
  duration: string;
}

export interface TimetableData {
  department: Department;
  semester: RomanNumeral;
  section: Section;
  schedule: ScheduleEntry[];
  examSchedule?: ExamSchedule[];
}

export interface FilterState {
  department: Department;
  semester: RomanNumeral;
  section: Section;
  selectedDay: Day | null;
  view: 'classes' | 'exams';
}