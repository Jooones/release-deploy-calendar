import {Injectable} from "@angular/core";
import {CalendarTo, DayTo} from "./calendar-to.model";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Calendar, Day, DayType, Month, Week} from "../domain/calendar.model";
import {map} from "rxjs/operators";
import exampleResponse from '../../assets/example-calendars/example.json';

import {environment} from '../../environments/environment';
import {MultiMap} from "../utils/multi-map";
import {YearMonth} from "../utils/year-month";

@Injectable()
export class CalendarService {

  constructor(private httpClient: HttpClient) {
  }

  getCalendar(): Observable<Calendar> {
    if (environment.production) {
      console.log("using prod backend for data")
      return this.httpClient.get<CalendarTo>(`api/calendar`).pipe(
        map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
      );
    } else {
      console.log("using test data")
      return of(exampleResponse).pipe(
        map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
      );
    }
  }

  mapTo(calendarTo: CalendarTo): Calendar {
    const months: Array<Month> = []

    this.extractDaysForMonths(this.sortDays(calendarTo.days))
      .forEach((yearMonth: YearMonth, daysOfYearMonth: DayTo[]) => {
        const month: Month = {
          name: this.findMonthNameByIndex(yearMonth.month),
          year: yearMonth.year,
          monthOfYear: yearMonth.month,
          weeks: this.mapDaysToWeeks(daysOfYearMonth)
        };
        months.push(month);
      });
    return {months: months};
  }

  extractDaysForMonths(days: Array<DayTo>): MultiMap<YearMonth, DayTo> {
    const daysByYearMonth: MultiMap<YearMonth, DayTo> = new MultiMap<YearMonth, DayTo>(YearMonth.parse);
    const firstMonth = YearMonth.fromDayTo(days[0]);
    const lastMonth = YearMonth.fromDayTo(days[days.length - 1]);

    days.forEach((day: DayTo) => {
      const currentMonth = YearMonth.fromDayTo(day);
      const previousMonth = currentMonth.previous();
      const nextMonth = currentMonth.next();

      daysByYearMonth.add(currentMonth, day);

      if (!currentMonth.equals(firstMonth)
        && this.countSundays(daysByYearMonth.get(previousMonth)) < 6) {
        daysByYearMonth.add(previousMonth, day);
      }

      if (!currentMonth.equals(lastMonth)
        && this.isDayOfLastWeek(day, currentMonth)) {
        daysByYearMonth.add(nextMonth, day);
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
        year: parseInt(dayTo.year),
        developVersion: dayTo.developVersion,
        rcVersion: dayTo.rcVersion,
        stgVersion: dayTo.stgVersion,
        prdVersion: dayTo.prdVersion,
        dayType: DayType[dayTo.dayType],
        top: dayTo.top,
        bottom: dayTo.bottom
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

  findMonthNameByIndex(monthIndex: number): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[monthIndex - 1];
  }

  isDayOfLastWeek(day: DayTo, month: YearMonth): boolean {
    const lastDayOfCurrentMonth = month.lastDay();
    const daysUntilLastDayOfCurrentMonth = lastDayOfCurrentMonth - day.dayOfMonth;
    return (day.dayOfWeek + daysUntilLastDayOfCurrentMonth) < 7
  }

  countSundays(days: DayTo[]): number {
    return days
      .filter((day: DayTo) => day.dayOfWeek === 7)
      .length;
  }
}

