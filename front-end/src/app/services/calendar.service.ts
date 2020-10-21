import {Injectable} from "@angular/core";
import {CalendarTo, DayTo} from "./calendar-to.model";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Calendar, Day, DayType, Month, Week} from "../domain/calendar.model";
import {map} from "rxjs/operators";
import exampleResponse from '../../assets/example-calendars/example.json';

//import {environment} from '../../environments/environment';

@Injectable()
export class CalendarService {

  constructor(private httpClient: HttpClient) {
  }

  getCalendar(): Observable<Calendar> {
    // TODO ...
    // unfortunately I don't know how to pass in ---prd or something similar to the static spring boot solution we made, someone fix this for me <3
    // #fml (don't remove this until we solved the issue, it's a search key)
    const useTestData = false;
    // if (!environment.production) {
    if (useTestData) {
      console.log("using test data")
      return of(exampleResponse).pipe(
        map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
      );
    } else {
      console.log("using prod backend for data")
      return this.httpClient.get<CalendarTo>(`api/calendar`).pipe(
        map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
      );
    }
  }

  mapTo(calendarTo: CalendarTo): Calendar {
    const months: Array<Month> = []

    this.extractDaysForMonths(this.sortDays(calendarTo.days)).forEach((daysOfYearMonth: DayTo[], yearMonthAsString: string) => {
      const yearMonth = YearMonth.parse(yearMonthAsString);
      const month: Month = {
        year: yearMonth.year,
        monthOfYear: yearMonth.month,
        weeks: this.mapDaysToWeeks(daysOfYearMonth)
      };
      months.push(month);
    });
    return {months: months};
  }

  extractDaysForMonths(days: Array<DayTo>): Map<string, Array<DayTo>> {
    const daysByYearMonth: Map<string, Array<DayTo>> = new Map<string, Array<DayTo>>();

    days.forEach((day: DayTo) => {
      const currentYearMonth = new YearMonth(parseInt(day.year), day.monthOfYear);
      const currentYearMonthAsString = currentYearMonth.toString();

      const previousYearMonth = currentYearMonth.previous();
      const previousYearMonthAsString = previousYearMonth.toString();

      const nextYearMonth = currentYearMonth.next();
      const nextYearMonthAsString = nextYearMonth.toString();

      if (!daysByYearMonth.has(currentYearMonthAsString)) {
        daysByYearMonth.set(currentYearMonthAsString, []);
      }

      const lastDayOfYearMonth = currentYearMonth.lastDay();
      const daysUntilLastDayOfMonth = lastDayOfYearMonth - day.dayOfMonth;

      const pushToNextMonth = (day.dayOfWeek + daysUntilLastDayOfMonth) < 7
      const pushToPreviousMonth = daysByYearMonth.get(previousYearMonthAsString)?.length < 42

      daysByYearMonth.get(currentYearMonthAsString).push(day);

      if (pushToPreviousMonth) {
        if (!daysByYearMonth.has(previousYearMonthAsString)) {
          daysByYearMonth.set(previousYearMonthAsString, []);
        }
        daysByYearMonth.get(previousYearMonthAsString).push(day);
      }
      if (pushToNextMonth) {
        if (!daysByYearMonth.has(nextYearMonthAsString)) {
          daysByYearMonth.set(nextYearMonthAsString, []);
        }
        daysByYearMonth.get(nextYearMonthAsString).push(day);
      }
    });

    return daysByYearMonth;
  }

  mapDaysToWeeks(days: Array<DayTo>): Array<Week> {
    let firstDay = true;
    const weeks: Array<Week> = [];
    let weekOfTheMonth: number = 0;
    let daysOfWeek: Array<Day> = new Array<Day>(7);

    days.forEach(dayTo => {
      if (dayTo.dayOfWeek === 1 && !firstDay) {
        daysOfWeek = new Array<Day>(7);
        weekOfTheMonth++;
      }
      firstDay = false;

      daysOfWeek[dayTo.dayOfWeek - 1] = {
        dayOfMonth: dayTo.dayOfMonth,
        dayOfWeek: dayTo.dayOfWeek,
        monthOfYear: dayTo.monthOfYear,
        developVersion: dayTo.developVersion,
        rcVersion: dayTo.rcVersion,
        stgVersion: dayTo.stgVersion,
        prdVersion: dayTo.prdVersion,
        dayType: DayType[dayTo.dayType]
      }

      weeks[weekOfTheMonth] = {
        days: daysOfWeek
      }
    });

    while (weeks.length < 6) {
      weeks[weeks.length] = {days: new Array<Day>(7)}
    }

    return weeks;
  }

  sortDays(days: Array<DayTo>): Array<DayTo> {
    return days.sort((d1, d2) => {

      const yearComparison = d1.year.localeCompare(d2.year);
      if (yearComparison !== 0) {
        return yearComparison;
      }
      const monthComparison = d1.monthOfYear - d2.monthOfYear;
      if (monthComparison !== 0) {
        return monthComparison
      }
      return d1.dayOfMonth - d2.dayOfMonth;
    })
  }

}

class YearMonth {

  static parse(yearMonthAsString) {
    const split = yearMonthAsString.split('-');
    return new YearMonth(parseInt(split[0]), parseInt(split[1]));
  }

  constructor(public year: number,
              public month: number) {
  }

  previous(): YearMonth {
    return this.month === 1
      ? new YearMonth(this.year - 1, 12)
      : new YearMonth(this.year, this.month - 1)
  }

  next(): YearMonth {
    return this.month === 12
      ? new YearMonth(this.year + 1, 1)
      : new YearMonth(this.year, this.month + 1)
  }

  lastDay(): number {
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  toString(): string {
    return `${this.year}-${this.month}`;
  }
}
