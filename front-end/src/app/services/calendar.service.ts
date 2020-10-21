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

    this.extractDaysForMonths(this.sortDays(calendarTo.days)).forEach((daysOfMonth, monthValue) => {
      const month: Month = {
        year: daysOfMonth[6].year,
        monthOfYear: monthValue,
        weeks: this.mapDaysToWeeks(daysOfMonth)
      };
      months.push(month);
    });

    return {months: months};
  }

  extractDaysForMonths(days: Array<DayTo>): Map<number, Array<DayTo>> {
    const daysByMonth: Map<number, Array<DayTo>> = new Map<number, Array<DayTo>>();

    days.forEach((day: DayTo) => {
      const currentMonth = day.monthOfYear;
      const previousMonth = currentMonth == 1 ? 12 : currentMonth - 1;
      const nextMonth = (currentMonth % 12) + 1;

      if (!daysByMonth.has(currentMonth)) {
        daysByMonth.set(currentMonth, []);
      }

      const lastDayOfMonth = new Date(parseInt(day.year), currentMonth + 1, 0).getDate();
      const daysUntilLastDayOfMonth = lastDayOfMonth - day.dayOfMonth;

      const pushToNextMonth = (day.dayOfWeek + daysUntilLastDayOfMonth) < 7
      const pushToPrevMonth = daysByMonth.get(previousMonth)?.length < 42

      daysByMonth.get(currentMonth).push(day);

      if (pushToPrevMonth) {
        if (!daysByMonth.has(previousMonth)) {
          daysByMonth.set(previousMonth, []);
        }
        daysByMonth.get(previousMonth).push(day);
      }
      if (pushToNextMonth) {
        if (!daysByMonth.has(nextMonth)) {
          daysByMonth.set(nextMonth, []);
        }
        daysByMonth.get(nextMonth).push(day);
      }
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
