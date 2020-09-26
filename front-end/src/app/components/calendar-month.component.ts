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
            <rdc-day-cell-component *ngIf="day" [day]="day" [month]="currentMonth"> </rdc-day-cell-component>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./calendar-month.component.scss"]
})
export class CalendarMonthComponent {
  @Input()
  currentMonth: Month;
}
