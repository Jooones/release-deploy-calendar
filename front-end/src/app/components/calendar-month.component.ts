import {Component, Input} from "@angular/core";
import {Day, Month} from "../domain/calendar.model";

@Component({
  selector: 'rdc-calendar-month',
  template: `
    <table class="table table-responsive-xl table-bordered">
      <thead>
      <tr>
        <th scope="col" style="width: 14.28%">Monday</th>
        <th scope="col" style="width: 14.28%">Tuesday</th>
        <th scope="col" style="width: 14.28%">Wednesday</th>
        <th scope="col" style="width: 14.28%">Thursday</th>
        <th scope="col" style="width: 14.28%">Friday</th>
        <th scope="col" style="width: 14.28%">Saturday</th>
        <th scope="col" style="width: 14.28%">Sunday</th>
      </tr>
      </thead>
      <tbody>
      <tr class="week-row" *ngFor="let week of currentMonth.weeks">
        <td *ngFor="let day of week.days" class="no-padding">
          <rdc-day-cell-component *ngIf="day"
                                  [day]="day">
          </rdc-day-cell-component>
        </td>
      </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .week-row {
      height: 8em;
    }
    .no-padding {
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
  `
  ]
})
export class CalendarMonthComponent {

  @Input()
  currentMonth: Month;
}
