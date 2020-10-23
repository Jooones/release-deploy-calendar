import { Component, Input } from "@angular/core";
import { Month } from "../domain/calendar.model";

@Component({
  selector: 'rdc-calendar-month',
  template: `
    <section class="flex flex-col h-full text-sm">
      <section class="grid grid-cols-7 border-gray-500 border-t divide-x divide-gray-500 bg-gray-200 select-none">
        <span class="p-1">Monday</span>
        <span class="p-1">Tuesday</span>
        <span class="p-1">Wednesday</span>
        <span class="p-1">Thursday</span>
        <span class="p-1">Friday</span>
        <span class="p-1">Saturday</span>
        <span class="p-1">Sunday</span>
      </section>
      <section class="flex-1 grid grid-rows-6">
        <section *ngFor="let week of currentMonth.weeks"
                 class="grid grid-cols-7 border-gray-500 border-t divide-x divide-gray-500">
          <section *ngFor="let day of week.days">
            <rdc-day-cell-component *ngIf="day"
                                    [day]="day"
                                    [month]="currentMonth"
                                    [devRcVersions]="devRcVersions"
                                    [stgPrdVersions]="stgPrdVersions">
            </rdc-day-cell-component>
          </section>
        </section>
      </section>
    </section>
  `
})
export class CalendarMonthComponent {
  @Input()
  currentMonth: Month;
  @Input()
  devRcVersions: boolean;
  @Input()
  stgPrdVersions: boolean;
}
