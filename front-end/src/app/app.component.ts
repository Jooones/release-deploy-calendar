import {Component, OnInit} from '@angular/core';
import {CalendarService} from "./services/calendar.service";
import {Calendar, Month} from "./domain/calendar.model";

@Component({
  selector: 'app-root',
  template: `
    <section *ngIf="calendar" class="flex flex-col h-screen">
      <section class="flex items-center justify-start lg:justify-center p-2 text-gray-700 space-x-2">
        <button class="bg-white shadow-xs hover:bg-gray-100 p-2 border border-gray-100 rounded-full"
                (click)="showPreviousMonth()">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <section class="text-base sm:text-xl font-semibold text-center rounded select-none w-32 sm:w-40">
          <span>{{selectedMonth.name}} {{selectedMonth.year}}</span>
        </section>
        <button class="bg-white shadow-xs hover:bg-gray-100 p-2 border border-gray-100 rounded-full"
                (click)="showNextMonth()">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <section class="absolute right-0 flex space-x-2 p-2">
          <button
            class="font-semibold text-sm sm:text-base text-white bg-gray-600 hover:bg-gray-700 border border-gray-700 p-2 rounded shadow-xs"
            (click)="showCurrentMonth()">
            <span>Today</span>
          </button>
          <rdc-settings [(devRcVersions)]="devRcVersions"
                        [(stgPrdVersions)]="stgPrdVersions">
          </rdc-settings>
          <a href="https://github.com/Jooones/release-deploy-calendar"
             target="_blank"
             class="bg-white shadow-xs hover:bg-gray-100 p-2 border border-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
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
