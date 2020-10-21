import {Component, Input, OnInit} from "@angular/core";
import {Day, DayType, Month} from "../../domain/calendar.model";

@Component({
  selector: "rdc-day-cell-component",
  template: `
    <section
      *ngIf="day"
      class="p-1 flex flex-col h-full text-sm"
      (mouseleave)="showAllVersions = false"
      (mouseenter)="showAllVersions = true"
      [ngClass]="{
        'bg-gray-300': isDayOfOtherMonth(day),
        'bg-gray-100': isWeekendDay(day.dayOfWeek),
        'bg-orange-200': isStgInstallDay(day.dayType),
        'border-2 border-blue-400': isToday
      }">
      <span class="block">{{ day.dayOfMonth }}</span>
      <section class="flex-1 grid grid-rows-4 gap-y-1 text-center">
        <section class="flex flex-col justify-center items-center border border-transparent rounded"
                 [ngClass]="{
          'bg-green-400 border-green-700': isNewSprintDay(day.dayType),
          'bg-gray-200 border-gray-300': isIntInstallDay(day.dayType),
          'bg-orange-400 border-orange-500': isStgInstallDay(day.dayType)
        }">
          <span *ngIf="isNewSprintDay(day.dayType)">START SPRINT {{day.developVersion.substr(3)}}</span>
          <span *ngIf="isIntInstallDay(day.dayType)">Freeze rc {{day.rcVersion}} + demo</span>
          <span *ngIf="isStgInstallDay(day.dayType)">STG {{day.stgVersion}}</span>
        </section>
        <section class="row-span-2 grid grid-rows-2 grid-cols-2 grid-flow-col uppercase italic">
          <section *ngIf="devRcVersions || showAllVersions"
                   class="flex items-center justify-center">
              <span class="font-semibold mr-1">dev</span> {{day.developVersion}}
          </section>
          <section *ngIf="devRcVersions || showAllVersions"
                   class="flex items-center justify-center">
            <span class="font-semibold mr-1">rc</span> {{day.rcVersion}}
          </section>
          <section *ngIf="stgPrdVersions || showAllVersions"
                   class="flex items-center justify-center">
            <span class="font-semibold mr-1">stg</span> {{day.stgVersion}}
          </section>
          <section *ngIf="stgPrdVersions || showAllVersions"
                   class="flex items-center justify-center">
            <span class="font-semibold mr-1">prd</span> {{day.prdVersion}}
          </section>
        </section>
        <section class="flex flex-col justify-center items-center border border-transparent rounded"
                 [ngClass]="{
          'bg-teal-300 border-teal-500': isNewSprintDay(day.dayType) || isIntInstallDay(day.dayType),
          'bg-red-400 border-red-700': isPrdInstallDay(day.dayType),
          'bg-pink-500 border-pink-700': isHotfixInstallDay(day.dayType)
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
  dayTypeClass: string;
  isToday: boolean;

  ngOnInit(): void {
    let passedInDate = new Date(
      Number(this.month.year),
      this.month.monthOfYear - 1,
      this.day.dayOfMonth
    );
    this.isToday = new Date().toDateString() === passedInDate.toDateString();
  }

  isWeekendDay(day: number) {
    return day === 6 || day === 7;
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
}
