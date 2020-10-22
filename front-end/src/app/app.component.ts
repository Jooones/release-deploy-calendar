import {Component, OnInit} from '@angular/core';
import {CalendarService} from "./services/calendar.service";
import {Calendar, Month} from "./domain/calendar.model";

@Component({
  selector: 'app-root',
  template: `
    <section *ngIf="calendar" class="flex flex-col h-screen">
      <section class="flex items-center xs:justify-start sm:justify-center p-2 text-gray-700 space-x-2">
        <button class="bg-white shadow-xs hover:bg-gray-100 p-2 border border-gray-100 rounded-full focus:outline-none"
                (click)="showPreviousMonth()">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <section class="text-xl font-semibold text-center rounded select-none w-40">
          <span>{{selectedMonth.name}} {{selectedMonth.year}}</span>
        </section>
        <button class="bg-white shadow-xs hover:bg-gray-100 p-2 border border-gray-100 rounded-full focus:outline-none"
                (click)="showNextMonth()">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <section class="absolute right-0 flex space-x-2 p-2 text-sm">
          <button
            class="font-semibold bg-white hover:bg-gray-100 border border-gray-200 p-2 rounded shadow-xs focus:outline-none"
            (click)="showCurrentMonth()">
            <span>{{currentMonth.name}} {{currentMonth.year}}</span>
          </button>
          <rdc-settings [(devRcVersions)]="devRcVersions"
                        [(stgPrdVersions)]="stgPrdVersions">
          </rdc-settings>
        </section>
      </section>

      <rdc-calendar-month [currentMonth]="selectedMonth"
                          [devRcVersions]="devRcVersions"
                          [stgPrdVersions]="stgPrdVersions"
                          class="flex-1">
      </rdc-calendar-month>
    </section>
  `
})
export class AppComponent implements OnInit {

  selectedMonth: Month;
  selectedMonthIndex: number;

  currentMonth: Month;
  currentMonthIndex: number;

  devRcVersions: boolean = false
  stgPrdVersions: boolean = false;

  calendar: Calendar;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.calendarService.getCalendar().subscribe((calendar: Calendar) => {
      this.calendar = calendar;
      this.initializeCurrentMonth();
      this.showCurrentMonth();
    });
  }

  showCurrentMonth() {
    this.showMonth(this.currentMonthIndex);
  }

  showPreviousMonth() {
    const previousMonthIndex = this.selectedMonthIndex - 1;
    this.showMonth(previousMonthIndex);
  }

  showNextMonth() {
    const nextMonthIndex = this.selectedMonthIndex + 1;
    this.showMonth(nextMonthIndex);
  }

  private showMonth(monthIndex: number) {
    this.selectedMonthIndex = this.clampMonthIndex(monthIndex);
    this.selectedMonth = this.calendar.months[this.selectedMonthIndex];
  }

  private initializeCurrentMonth() {
    this.currentMonthIndex = this.calculateCurrentMonthIndex();
    this.currentMonth = this.calendar.months[this.currentMonthIndex];
  }

  private calculateCurrentMonthIndex(): number {
    return this.calendar.months
      .findIndex(month => month.year === new Date().getFullYear()
        && month.monthOfYear === new Date().getMonth() + 1);
  }

  private clampMonthIndex(monthIndex: number) {
    const monthsCount = this.calendar.months.length - 1;
    return monthIndex > monthsCount ? monthsCount : monthIndex < 0 ? 0 : monthIndex;
  }
}
