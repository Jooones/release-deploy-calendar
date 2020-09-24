import {Component, Input, OnInit} from "@angular/core";
import {Day, DayType} from "../../domain/calendar.model";

@Component({
  selector: 'rdc-day-cell-component',
  template: `
    <div *ngIf="day" [ngClass]="{'weekend-day': isWeekendDay(day.dayOfWeek), 'stg-install-day': isStgInstallDay(day.dayType)}">
      <div *ngIf="isNewSprintDay(day.dayType)" class="new-sprint-day">NEW SPRINT</div>
      <span>
            {{day.dayOfMonth}}<br/>
            dev: {{day.developVersion}}<br/>
            rc: {{day.rcVersion}}<br/>
            stg: {{day.stgVersion}}<br/>
            prd: {{day.prdVersion}}<br/>
      </span>
      <div *ngIf="isPrdInstallDay(day.dayType)" class="prd-install-day">PRD INSTALL</div>
    </div>
  `,
  styles: [`
    .new-sprint-day {
      background-color: darkseagreen;
    }

    .stg-install-day {
      background-color: moccasin;
    }

    .prd-install-day {
      background-color: palevioletred;
    }

    .normal-day {
    }

    .wut-day {
      background-color: darkred;
    }

    .weekend-day {
      background-color: darkgray;
      margin: 0;
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
