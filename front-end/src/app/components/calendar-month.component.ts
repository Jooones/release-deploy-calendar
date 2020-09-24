import { Component, Input } from "@angular/core";
import { Month } from "../domain/calendar.model";

@Component({
  selector: 'rdc-calendar-month',
  template: `
    <div class="calendar-month">
      <div class="calendar-header">
        <div class="cell">Monday</div>
        <div class="cell">Tuesday</div>
        <div class="cell">Wednesday</div>
        <div class="cell">Thursday</div>
        <div class="cell">Friday</div>
        <div class="cell">Saturday</div>
        <div class="cell">Sunday</div>
      </div>
      <div *ngFor="let week of currentMonth.weeks" class="calendar-week">
        <div *ngFor="let day of week.days" class="day cell">
            <rdc-day-cell-component [day]="day"> </rdc-day-cell-component>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .calendar-month {
        height: 100%;
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-width: 1px 1px 0 0;
      }

      .calendar-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }

      .calendar-week {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }

      .cell {
        border-style: solid;
        border-width: 0 0 1px 1px;
      }

      .day {
        height: 100%;
      }

      .weekend-day {
        background-color: aliceblue;
        margin: 0;
      }
    `,
  ]
})
export class CalendarMonthComponent {
  @Input()
  currentMonth: Month;
}
