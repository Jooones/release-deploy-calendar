import {Injectable} from "@angular/core";
import {CalendarTo, DayTo, testCalendar} from "./calendarTo";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Calendar, Month, Day, Week} from "../domain/Calendar";
import {map} from "rxjs/operators";

@Injectable()
export class CalenderService{

  constructor(private httpClient: HttpClient) {

  }

  getCalendar(): Observable<Calendar> {
    return of(testCalendar()).pipe(
      map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
    );
  }

  mapTo(calendarTo: CalendarTo): Calendar{
    const months:Array<Month> = []

    this.extractYearsFromCalendarTo(calendarTo).sort().forEach((yearValue: String) => {
      const daysOfYear: Array<DayTo> = calendarTo.days.filter((day:DayTo) => day.year === yearValue);
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

    const calendar: Calendar = {
      months: months
    }

    console.log(calendar);

    return calendar;

  }

  extractYearsFromCalendarTo(calendarTo: CalendarTo): Array<String> {
   const test = Array.from(new Set(calendarTo.days.map((dayTo: DayTo) => dayTo.year)).values());
   console.log(test);
   return test;
  }

  extractMonthsFromDaysInYear(days: Array<Day>){
    const test = Array.from(new Set(days.map((dayTo: DayTo) => dayTo.monthOfYear)).values());
    console.log(test);
    return test;
  }

  mapDaysToWeeks(days: Array<Day>): Array<Week>{
    const weeks: Array<Week> = [];
    let weekOfTheMonth: number = -1;
    let daysOfWeek: Array<Day> = [];

    days.forEach(dayTo => {
      if (dayTo.dayOfWeek-1 % 7 === 0){

        daysOfWeek = [];
        weekOfTheMonth++;
      }

      daysOfWeek[dayTo.dayOfWeek-1] = {
        dayOfMonth: dayTo.dayOfMonth,
        dayOfWeek: dayTo.dayOfWeek
      }

      weeks[weekOfTheMonth] = {
        days: daysOfWeek
      }
    })

    return weeks;
  }

}
