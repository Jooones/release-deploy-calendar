import {Injectable} from "@angular/core";
import {CalendarTo, testCalendar} from "./calendarTo";
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

  mapTo(calendarTo: CalendarTo): Calendar {
    const months: Array<Month> = [];

    calendarTo.months.forEach(monthTo => {
      months[monthTo.monthOfYear - 1] =  {
        year: monthTo.year,
        monthOfYear: monthTo.monthOfYear,
        weeks: this.mapDaysToWeeks(monthTo.days)
      }
    });


    const calendar: Calendar = {
      months: months
    };

    console.log(calendar);

    return calendar;
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
