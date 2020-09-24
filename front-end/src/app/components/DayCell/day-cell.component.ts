import {Component, Input, OnInit} from "@angular/core";
import {Day, DayType} from "../../domain/calendar.model";

@Component({
  selector: 'rdc-day-cell-component',
  template: `
    <div *ngIf="day" [ngClass]="{'weekend-day': isWeekendDay(day.dayOfWeek), 'stg-install-day': isStgInstallDay(day.dayType)}">
      <div class="slight-border">
        {{day.dayOfMonth}}<br/>
        <div class="box-height">
          <div *ngIf="isNewSprintDay(day.dayType)" class="new-sprint-day">START SPRINT {{day.developVersion.substr(3)}}</div>
          <div *ngIf="isStgInstallDay(day.dayType)" class="text-center">STG INSTALL {{day.stgVersion}}</div>
        </div>
        <div class="d-inline-block slight-padding-top-bottom">
          dev: {{day.developVersion}}<br/>
          rc: {{day.rcVersion}}<br/>
        </div>
        <div class="float-right slight-padding-top-bottom slightly-faded-text">
          stg: {{day.stgVersion}}<br/>
          prd: {{day.prdVersion}}<br/>
        </div>
        <div class="box-height">
          <div *ngIf="isPrdInstallDay(day.dayType)" class="prd-install-day">PRD INSTALL {{day.stgVersion}}</div> <!-- stgVersion.. I know.. ¯\_(ツ)_/¯ -->
        </div>
      </div>
    </div>
  `,
  styles: [`
    .new-sprint-day {
      background-color: lightgreen;
      text-align: center;
    }

    .stg-install-day {
      background-color: moccasin;
    }

    .prd-install-day {
      background-color: pink;
      text-align: center;
    }

    .normal-day {
    }

    .wut-day {
      background-color: darkred;
    }

    .weekend-day {
      background-color: lightgrey;
      margin: 0;
    }

    .slight-border {
      padding: 5px;
    }

    .box-height {
      height: 25px
    }

    .slight-padding-top-bottom {
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .slightly-faded-text {
      color: gray;
    }
  `
  ]
})
export class DayCellComponent implements OnInit {

  @Input()
  day: Day;
  dayTypeClass: string;

  ngOnInit(): void {
    this.fillInDayType(this.day.dayType);
  }

  private fillInDayType(dayType: DayType) {
    switch (dayType) {
      case DayType.NEW_SPRINT:
        this.dayTypeClass = 'new-sprint-day'
        break;
      case DayType.STG_INSTALL:
        this.dayTypeClass = 'stg-install-day'
        break;
      case DayType.PRD_INSTALL:
        this.dayTypeClass = 'prd-install-day'
        break;
      case DayType.NORMAL:
        this.dayTypeClass = 'normal-day'
        break;
      default:
        this.dayTypeClass = 'wut-day'
        break;
    }
  }

  isWeekendDay(day: number) {
    return day === 6 || day === 7
  }

  isNewSprintDay(dayType: DayType): boolean {
    return dayType === DayType.NEW_SPRINT
  }

  isStgInstallDay(dayType: DayType): boolean {
    return dayType === DayType.STG_INSTALL
  }

  isPrdInstallDay(dayType: DayType): boolean {
    return dayType === DayType.PRD_INSTALL
  }
}
