import {Component, OnInit} from '@angular/core';
import {CalendarService} from "./services/calendar.service";
import {Calendar, Month} from "./domain/calendar.model";

@Component({
  selector: 'app-root',
  template: `
    <section *ngIf="calendar" class="flex flex-col h-screen">
      <section class="flex items-center justify-center p-2 text-xl text-gray-700 space-x-2">
        <button class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full focus:outline-none"
                (click)="showPreviousMonth()">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <section class="font-semibold rounded select-none">
          {{selectedMonthName}} {{selectedMonth.year}}
        </section>
        <button class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full focus:outline-none"
                (click)="showNextMonth()">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <section class="absolute right-0 flex space-x-1 p-1 mr-1 select-none text-sm">
          <button class="text-white bg-blue-500 hover:bg-blue-600 border border-blue-700 p-2 rounded focus:outline-none"
                  (click)="showCurrentMonth()">
            <span>{{ currentMonthName }} {{ currentMonth.year }}</span>
          </button>
          <label class="inline-flex items-center p-2 rounded space-x-1">
            <input id="devRcVersions" type="checkbox" [(ngModel)]="devRcVersions">
            <span>dev and rc versions</span>
          </label>
          <label class="inline-flex items-center p-2 rounded space-x-1">
            <input id="stgPrdVersions" type="checkbox" [(ngModel)]="stgPrdVersions">
            <span>stg and prd versions</span>
          </label>
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
  selectedMonthName: string;
  selectedMonthIndex: number;

  currentMonth: Month;
  currentMonthName: string;
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

  private setCurrentMonthIndex(monthIndex: number) {
    if (monthIndex > 0 && monthIndex < this.calendar?.months.length - 1) {
      this.selectedMonthIndex = monthIndex;
    }
  }

  showPreviousMonth() {
    this.setCurrentMonthIndex(this.selectedMonthIndex - 1);
    this.showMonthWithIndex(this.selectedMonthIndex);
  }

  showCurrentMonth() {
    this.setCurrentMonthIndex(this.calculateCurrentMonthIndex());
    this.showMonthWithIndex(this.selectedMonthIndex);
  }

  showNextMonth() {
    this.setCurrentMonthIndex(this.selectedMonthIndex + 1);
    this.showMonthWithIndex(this.selectedMonthIndex);
  }

  showMonthWithIndex(monthIndex: number) {
    this.selectedMonth = this.calendar.months[monthIndex];
    this.selectedMonthName = AppComponent.findMonthNameByIndex(this.selectedMonth.monthOfYear - 1);
  }

  private initializeCurrentMonth() {
    this.currentMonthIndex = this.calculateCurrentMonthIndex();
    this.currentMonth = this.calendar.months[this.currentMonthIndex];
    this.currentMonthName = AppComponent.findMonthNameByIndex(this.currentMonth.monthOfYear - 1);
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

  private static findMonthNameByIndex(monthIndex: number) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
  }
}
