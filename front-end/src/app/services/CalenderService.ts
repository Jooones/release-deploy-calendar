import {Injectable} from "@angular/core";
import {CalendarTo, DayTo} from "./calendarTo";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Calendar, Day, Month, Week} from "../domain/Calendar";
import {map} from "rxjs/operators";

@Injectable()
export class CalenderService {

  constructor(private httpClient: HttpClient) {
  }

  getCalendar(): Observable<Calendar> {
    return this.httpClient.get<CalendarTo>(`api/calendar`).pipe(
      map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
    );
  }

  mapTo(calendarTo: CalendarTo): Calendar {
    const months: Array<Month> = []

    this.extractYearsFromCalendarTo(calendarTo).sort().forEach((yearValue: String) => {
      const daysOfYear: Array<DayTo> = calendarTo.days.filter((day: DayTo) => day.year === yearValue);
      this.extractMonthsFromDaysInYear(daysOfYear).sort().forEach((monthValue: number) => {
        const weeksOfMonth: Array<Week> = this.mapDaysToWeeks(daysOfYear.filter((day: DayTo) => day.monthOfYear === monthValue));
        const month: Month = {
          year: yearValue,
          monthOfYear: monthValue,
          weeks: weeksOfMonth
        };
        months.push(month);
      })
    });

    return {months: months}
  }

  extractYearsFromCalendarTo(calendarTo: CalendarTo): Array<String> {
    // const test = Array.from(new Set(calendarTo.days.map((dayTo: DayTo) => dayTo.year)).values());

    return Array.from(new Set(
      calendarTo.days.reduce(function (accumulator, dayTo: DayTo) {
        accumulator.push(dayTo.year)
        return accumulator;
      }, [])
    ));
  }

  extractMonthsFromDaysInYear(days: Array<DayTo>) {
    // const test = Array.from(new Set(days.map((dayTo: DayTo) => dayTo.monthOfYear)).values());

    return Array.from(new Set(
      days.reduce(function (accumulator: Array<number>, dayTo: DayTo) {
        accumulator.push(dayTo.monthOfYear);
        return accumulator
      }, [])
    ));
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

}
