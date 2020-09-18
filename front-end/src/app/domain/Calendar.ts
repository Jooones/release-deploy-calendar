import {TrustedUrlString} from "@angular/core/src/sanitization/bypass";

export interface Calendar {
  months: Array<Month>;
}

export interface Month {
  year: String;
  monthOfYear: number;
  weeks: Array<Week>;
}

export interface Week {
  days: Array<Day>;
}

export interface Day {
  dayOfMonth: number;
  dayOfWeek: number;
  developVersion: String;
  rcVersion: String;
  stgVersion:String;
  prdVersion: String;
}
