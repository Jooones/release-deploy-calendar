import {Injectable} from "@angular/core";
import {CalendarTo, DayTo, testCalendar} from "./calendarTo";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Calendar, Month, Day, Week} from "../domain/Calendar";
import {map} from "rxjs/operators";
import {DayCellComponent} from "../components/DayCell/day-cell.component";
import {d} from "@angular/core/src/render3";

@Injectable()
export class CalenderService{

  constructor(private httpClient: HttpClient) {

  }

  getCalendar(): Observable<Calendar> {
    const thisIsATest = false;
    if(thisIsATest){
      return of(testCalendar()).pipe(
        map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
      );
    }else{
      return this.httpClient.get<CalendarTo>(`api/calendar`)
        .pipe(
          map((calendarTo: CalendarTo) => this.mapTo(calendarTo))
        );
    }
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
    // var totalYears = pilots.reduce(function (accumulator, pilot) {
    //   return accumulator + pilot.years;
    // }, 0);

    const test =
      Array.from(new Set(
      calendarTo.days.reduce(function (accumulator,dayTo: DayTo) {
      accumulator.push(dayTo.year)
      return accumulator;
    },[])));

   // const test = Array.from(new Set(calendarTo.days.map((dayTo: DayTo) => dayTo.year)).values());
   // console.log(test);
   return test;
  }

  extractMonthsFromDaysInYear(days: Array<DayTo>){
    // const test = Array.from(new Set(days.map((dayTo: DayTo) => dayTo.monthOfYear)).values());

    const test = Array.from(new Set(
      days.reduce(function(accumulator:Array<number>, dayTo:DayTo) {
        accumulator.push(dayTo.monthOfYear);
        return accumulator
      }, [])
    ));


    // console.log(test);
    return test;
  }

  mapDaysToWeeks(days: Array<DayTo>): Array<Week>{
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
