import { Component, Input, OnInit } from "@angular/core";
import { Day, DayType, Month } from "../../domain/calendar.model";

@Component({
  selector: "rdc-day-cell-component",
  template: `
    <ng-template #tipContent>
      DEV: {{day.developVersion}} RC: {{day.rcVersion}}<br/>
      STG: {{day.stgVersion}} PRD: {{day.prdVersion}}
    </ng-template>
    <div
      *ngIf="day"
      class="day-cell"
      [ngClass]="{
        'weekend-day': isWeekendDay(day.dayOfWeek),
        'stg-install-day': isStgInstallDay(day.dayType),
        today: isToday
      }"
      [ngbTooltip]="tipContent"
    >
      <div class="day-item">{{ day.dayOfMonth }}</div>
      <div class="installation-header">
          <div *ngIf="isNewSprintDay(day.dayType)" class="new-sprint-day">START SPRINT {{day.developVersion.substr(3)}}</div>
          <div *ngIf="isStgInstallDay(day.dayType)" class="text-center">STG INSTALL {{day.stgVersion}}</div>
      </div>
      <div *ngIf="devRcVersions" class="dev-version">dev: {{day.developVersion}}</div>
      <div *ngIf="devRcVersions" class="rc-version">rc: {{day.rcVersion}}</div>
      <div *ngIf="stgPrdVersions" class="stg-version float-right">stg: {{day.stgVersion}}</div>
      <div *ngIf="stgPrdVersions" class="prd-version float-right">prd: {{day.prdVersion}}</div>
      <div class="installation-footer">
        <div *ngIf="isPrdInstallDay(day.dayType)" class="prd-install-day">PRD INSTALL {{day.stgVersion}}</div> <!-- stgVersion.. I know.. ¯\_(ツ)_/¯ -->
      </div>
    </div>
  `,
  styleUrls: ["./day-cell.component.css"]
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

  dayTypeClass: string;
  isToday: boolean;

  ngOnInit(): void {
    this.fillInDayType(this.day.dayType);
    let passedInDate = new Date(
      Number(this.month.year),
      this.month.monthOfYear - 1,
      this.day.dayOfMonth
    );
    this.isToday = new Date().toDateString() === passedInDate.toDateString();
  }

  private fillInDayType(dayType: DayType) {
    switch (dayType) {
      case DayType.NEW_SPRINT:
        this.dayTypeClass = "new-sprint-day";
        break;
      case DayType.STG_INSTALL:
        this.dayTypeClass = "stg-install-day";
        break;
      case DayType.PRD_INSTALL:
        this.dayTypeClass = "prd-install-day";
        break;
      case DayType.NORMAL:
        this.dayTypeClass = "normal-day";
        break;
      default:
        this.dayTypeClass = "wut-day";
        break;
    }
  }

  isWeekendDay(day: number) {
    return day === 6 || day === 7;
  }

  isNewSprintDay(dayType: DayType): boolean {
    return dayType === DayType.NEW_SPRINT;
  }

  isStgInstallDay(dayType: DayType): boolean {
    return dayType === DayType.STG_INSTALL;
  }

  isPrdInstallDay(dayType: DayType): boolean {
    return dayType === DayType.PRD_INSTALL;
  }
}
