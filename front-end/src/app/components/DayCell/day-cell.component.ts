import {Component, Input, OnInit} from "@angular/core";
import {Day, DayType} from "../../domain/calendar.model";

@Component({
  selector: 'rdc-day-cell-component',
  template: `
    <span [ngClass]="dayTypeClass">
        {{day.dayOfMonth}}<br/>
        dev: {{day.developVersion}}<br/>
        rc: {{day.rcVersion}}<br/>
        stg: {{day.stgVersion}}<br/>
        prd: {{day.prdVersion}}<br/>
    </span>
  `,
  styles: [`
    .new-sprint-day {
      background-color: mediumseagreen;
    }
    .stg-install-day{
      background-color: moccasin;
    }
    .prd-install-day{
      background-color: mediumpurple;
    }
    .normal-day{
      background-color: lightblue;
    }
    .wut-day{
      background-color: darkred;
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
}
