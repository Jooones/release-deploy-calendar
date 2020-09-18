export interface Calendar {
  months: Array<Month>;
}

export interface Month {
  year: string;
  monthOfYear: number;
  weeks: Array<Week>;
}

export interface Week {
  days: Array<Day>;
}

export interface Day {
  dayOfMonth: number;
  dayOfWeek: number;
}
