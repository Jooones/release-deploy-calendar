export interface CalendarTo {
  days: Array<DayTo>;
}

export interface DayTo {
  dayOfWeek: number;
  dayOfMonth: number;
  monthOfYear: number;
  year: string;
  developVersion: string;
  rcVersion: string;
  stgVersion: string;
  prdVersion: string;
  dayType: string;
}
