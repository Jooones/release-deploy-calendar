import {Component, Input, OnInit} from "@angular/core";
import {Day, DayType, Month} from "../../domain/calendar.model";

@Component({
  selector: "rdc-day-cell-component",
  template: `
    <section
      *ngIf="day"
      class="p-1 flex flex-col h-full border-2 border-transparent text-xs sm:text-sm {{ sprintColor() }}"
      (mouseleave)="showAllVersions = false"
      (mouseenter)="showAllVersions = true"
      [ngClass]="{ 'border-blue-500': isToday }">
      <span class="block">{{ day.dayOfMonth }}</span>
      <section class="flex-1 grid grid-rows-6 sm:grid-rows-4 gap-y-1 text-center">
        <section class="flex flex-col justify-center items-center border border-transparent rounded"
                 [ngClass]="{ 'bg-orange-400 border-orange-500': isStgInstallDay(day.dayType) }">
          <span *ngIf="isNewSprintDay(day.dayType)">START SPRINT {{day.developVersion.substr(3)}}</span>
          <span *ngIf="isIntInstallDay(day.dayType)">Freeze rc {{day.rcVersion}} + demo</span>
          <span *ngIf="isStgInstallDay(day.dayType)">STG {{day.stgVersion}}</span>
        </section>
        <section class="row-span-4 sm:row-span-2 grid grid-rows-4 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 grid-flow-col text-xs xl:text-sm uppercase italic">
          <section *ngIf="devRcVersions || showAllVersions"
                   class="flex flex-col lg:flex-row items-center justify-center">
            <span class="font-semibold mr-1">dev</span> {{day.developVersion}}
          </section>
          <section *ngIf="devRcVersions || showAllVersions"
                   class="flex flex-col lg:flex-row items-center justify-center">
            <span class="font-semibold mr-1">rc</span> {{day.rcVersion}}
          </section>
          <section *ngIf="stgPrdVersions || showAllVersions"
                   class="flex flex-col lg:flex-row items-center justify-center">
            <span class="font-semibold mr-1">stg</span> {{day.stgVersion}}
          </section>
          <section *ngIf="stgPrdVersions || showAllVersions"
                   class="flex flex-col lg:flex-row items-center justify-center">
            <span class="font-semibold mr-1">prd</span> {{day.prdVersion}}
          </section>
        </section>
        <section class="flex flex-col justify-center items-center border border-transparent rounded"
                 [ngClass]="{
          'bg-teal-300 border-teal-500': isNewSprintDay(day.dayType) || isIntInstallDay(day.dayType),
          'bg-red-400 border-red-700': isPrdInstallDay(day.dayType),
          'bg-pink-400 border-pink-700': isHotfixInstallDay(day.dayType)
        }">
          <span *ngIf="isNewSprintDay(day.dayType)">KNG INT {{day.rcVersion}}</span>
          <span *ngIf="isIntInstallDay(day.dayType)">INT {{day.rcVersion}}</span>
          <span *ngIf="isPrdInstallDay(day.dayType)">PRD {{day.stgVersion}}</span>
          <span *ngIf="isHotfixInstallDay(day.dayType)">HOTFIX PRD {{day.prdVersion}}.X ?</span>
        </section>
      </section>
    </section>
  `
})
export class DayCellComponent implements OnInit {

  @Input()
  day: Day;
  @Input()
  month: Month;
  @Input()
  devRcVersions: boolean;
  @Input()
  stgPrdVersions: boolean;

  showAllVersions: boolean = false;
  isToday: boolean;

  ngOnInit(): void {
    const passedInDate = new Date(
      this.day.year,
      this.day.monthOfYear - 1,
      this.day.dayOfMonth
    );
    this.isToday = new Date().toDateString() === passedInDate.toDateString();
  }

  isWeekendDay(day: Day) {
    return day.dayOfWeek === 6 || day.dayOfWeek === 7;
  }

  isDayOfOtherMonth(day: Day) {
    return day.monthOfYear !== this.month.monthOfYear;
  }

  isNewSprintDay(dayType: DayType): boolean {
    return dayType === DayType.NEW_SPRINT;
  }

  isIntInstallDay(dayType: DayType): boolean {
    return dayType === DayType.INT_INSTALL;
  }

  isStgInstallDay(dayType: DayType): boolean {
    return dayType === DayType.STG_INSTALL;
  }

  isPrdInstallDay(dayType: DayType): boolean {
    return dayType === DayType.PRD_INSTALL;
  }

  isHotfixInstallDay(dayType: DayType): boolean {
    return dayType === DayType.PRD_HOTFIX_INSTALL;
  }

  isSprintNumberEven(): boolean {
    const developVersion = this.day.developVersion;
    const lastSprintNumber = developVersion.substr(developVersion.length - 1, 1);
    return parseInt(lastSprintNumber) % 2 === 0;
  }

  sprintColor() {
    if (this.isDayOfOtherMonth(this.day)) {
      return 'bg-gray-300';
    }
    if (this.isWeekendDay(this.day)) {
      return 'bg-gray-100';
    }
    return this.isSprintNumberEven() ? 'bg-green-200' : 'bg-green-300';
  }
}
