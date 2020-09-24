import {Injectable} from "@angular/core";
import {CalendarTo, DayTo} from "./calendar-to.model";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Calendar, Day, DayType, Month, Week} from "../domain/calendar.model";
import {map} from "rxjs/operators";
import {isNullOrUndefined} from "util";
import exampleResponse from '../../assets/example-calendars/example.json';

//import {environment} from '../../environments/environment';

@Injectable()
export class CalendarService {

  constructor(private httpClient: HttpClient) {
  }

  getCalendar(): Observable<Calendar> {
    // TODO change to false to use prd data
    // unfortunately I don't know how to pass in ---prd or something similar to the static spring boot solution we made, someone fix this for me <3
    // if (!environment.production) {
    if (false) {
      console.log("using test data")
      return of(exampleResponse).pipe(map((calendarTo: CalendarTo) => this.mapTo(calendarTo)))
    } else {
      console.log("using prod backend for data")
      return this.httpClient.get<CalendarTo>(`api/calendar`).pipe(
        map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
      );
    }
  }

  mapTo(calendarTo: CalendarTo): Calendar {
    const months: Array<Month> = []

    this.extractDaysForYears(this.sortDays(calendarTo.days)).forEach((daysOfYear, yearValue) => {
      this.extractDaysForMonths(daysOfYear).forEach((daysOfMonth, monthValue) => {
        const month: Month = {
          year: yearValue,
          monthOfYear: monthValue,
          weeks: this.mapDaysToWeeks(daysOfMonth)
        };
        months.push(month);
      })
    });

    return {months: months};
  }

  extractDaysForYears(days: Array<DayTo>): Map<string, Array<DayTo>> {
    const daysByYear: Map<string, Array<DayTo>> = new Map<string, Array<DayTo>>();

    days.forEach((day: DayTo) => {
      if (isNullOrUndefined(daysByYear.get(day.year))) {
        daysByYear.set(day.year, []);
      }
      daysByYear.get(day.year).push(day);
    });

    return daysByYear;
  }

  extractDaysForMonths(days: Array<DayTo>): Map<number, Array<DayTo>> {
    const daysByMonth: Map<number, Array<DayTo>> = new Map<number, Array<DayTo>>();

    days.forEach((day: DayTo) => {
      if (isNullOrUndefined(daysByMonth.get(day.monthOfYear))) {
        daysByMonth.set(day.monthOfYear, []);
      }
      daysByMonth.get(day.monthOfYear).push(day);
    });

    return daysByMonth;
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
        developVersion: dayTo.developVersion,
        rcVersion: dayTo.rcVersion,
        stgVersion: dayTo.stgVersion,
        prdVersion: dayTo.prdVersion,
        dayType: DayType[dayTo.dayType]
      }

      weeks[weekOfTheMonth] = {
        days: daysOfWeek
      }
    })

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
