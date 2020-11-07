export interface Calendar {
  months: Array<Month>;
}

export interface Month {
  year: number;
  name: string;
  monthOfYear: number;
  weeks: Array<Week>;
}

export interface Week {
  days: Array<Day>;
}

export interface Day {
  dayOfMonth: number;
  dayOfWeek: number;
  monthOfYear: number;
  year: number;
  developVersion: String;
  rcVersion: String;
  stgVersion: String;
  prdVersion: String;
  dayType: DayType;
  top: String;
  bottom: String;
}

export enum DayType {
  NORMAL, NEW_SPRINT, INT_INSTALL, STG_INSTALL, PRD_INSTALL, PRD_HOTFIX_INSTALL
}
