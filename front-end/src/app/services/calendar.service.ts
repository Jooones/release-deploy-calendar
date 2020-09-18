import {Injectable} from "@angular/core";
import {CalendarTo, DayTo} from "./calendar-to.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Calendar, Day, Month, Week} from "../domain/calendar.model";
import {map} from "rxjs/operators";
import {isNullOrUndefined} from "util";

@Injectable()
export class CalendarService {

  constructor(private httpClient: HttpClient) {
  }

  getCalendar(): Observable<Calendar> {
    return this.httpClient.get<CalendarTo>(`api/calendar`).pipe(
      map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
    );
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

  extractDaysForYears(days: Array<DayTo>): Map<string,Array<DayTo>> {
    const daysByYear:Map<string, Array<DayTo>> = new Map<string, Array<DayTo>>();

    days.forEach((day:DayTo) => {
      if(isNullOrUndefined(daysByYear.get(day.year))){
        daysByYear.set(day.year,[]);
      }
      daysByYear.get(day.year).push(day);
    });

    return daysByYear;
  }

  extractDaysForMonths(days: Array<DayTo>): Map<number, Array<DayTo>> {
    const daysByMonth:Map<number, Array<DayTo>> = new Map<number, Array<DayTo>>();

    days.forEach((day:DayTo) => {
      if(isNullOrUndefined(daysByMonth.get(day.monthOfYear))){
        daysByMonth.set(day.monthOfYear,[]);
      }
      daysByMonth.get(day.monthOfYear).push(day);
    });

    return daysByMonth;
  }

  mapDaysToWeeks(days: Array<DayTo>): Array<Week> {
    const weeks: Array<Week> = [];
    let weekOfTheMonth: number = 0;
    let daysOfWeek: Array<Day> = new Array<Day>(7);

    days.forEach(dayTo => {
      if (dayTo.dayOfWeek - 1 % 7 === 0) {
        daysOfWeek = new Array<Day>(7);
        weekOfTheMonth++;
      }

      daysOfWeek[dayTo.dayOfWeek - 1] = {
        dayOfMonth: dayTo.dayOfMonth,
        dayOfWeek: dayTo.dayOfWeek,
        developVersion: dayTo.developVersion,
        rcVersion: dayTo.rcVersion,
        stgVersion: dayTo.stgVersion,
        prdVersion: dayTo.prdVersion
      }

      weeks[weekOfTheMonth] = {
        days: daysOfWeek
      }
    })

    return weeks;
  }

  sortDays(days: Array<DayTo>): Array<DayTo> {
    return days.sort((d1,d2) => {

      const yearComparison = d1.year.localeCompare(d2.year);
      if(yearComparison !== 0){
        return yearComparison;
      }
      const monthComparison = d1.monthOfYear - d2.monthOfYear;
      if(monthComparison !== 0){
        return monthComparison
      }
      return d1.dayOfMonth - d2.dayOfMonth;
    })
  }

}
