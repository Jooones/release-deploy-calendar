import {Component, OnInit} from '@angular/core';
import {CalendarService} from "./services/calendar.service";
import {Observable} from "rxjs";
import {Calendar, Month} from "./domain/calendar.model";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="(calendar$|async)">
      <h1>{{currentMonth.year}} - {{currentMonth.monthOfYear}}</h1>

      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary" (click)="showPreviousMonth()">Previous month</button>
        <button type="button" class="btn btn-secondary" (click)="showCurrentMonth()">Current month</button>
        <button type="button" class="btn btn-primary" (click)="showNextMonth()">Next month</button>
      </div>

      <rdc-calendar-month [currentMonth]="currentMonth"></rdc-calendar-month>
    </div>
  `
})
export class AppComponent implements OnInit {
  calendar$: Observable<Calendar>;

  currentMonth: Month;

  private calendar: Calendar;
  private currentMonthIndex: number;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.calendar$ = this.calendarService.getCalendar().pipe(
      tap((calendar: Calendar) => this.calendar = calendar),
      tap(() => this.showCurrentMonth())
    );
  }

  private setCurrentMonthIndex(monthIndex: number) {
    if (monthIndex < 0) {
      this.currentMonthIndex = 0;
    } else if (monthIndex >= this.calendar.months.length) {
      this.currentMonthIndex = this.calendar.months.length - 1;
    } else {
      this.currentMonthIndex = monthIndex;
    }
  }

  showPreviousMonth() {
    this.setCurrentMonthIndex(this.currentMonthIndex - 1);
    this.showMonthWithIndex(this.currentMonthIndex);
  }

  showCurrentMonth() {
    this.setCurrentMonthIndex(this.calculateCurrentMonthIndex());
    this.showMonthWithIndex(this.currentMonthIndex);
  }

  showNextMonth() {
    this.setCurrentMonthIndex(this.currentMonthIndex + 1);
    this.showMonthWithIndex(this.currentMonthIndex);
  }

  showMonthWithIndex(monthIndex: number) {
    this.currentMonth = this.calendar.months[monthIndex];
  }

  private calculateCurrentMonthIndex(): number {
    return this.calendar.months
      .indexOf(this.findCurrentMonth());
  }

  private findCurrentMonth() {
    return this.calendar.months
      .find(month => month.year === new Date().getFullYear().toString()
        && month.monthOfYear === new Date().getMonth() + 1);
  }
}
