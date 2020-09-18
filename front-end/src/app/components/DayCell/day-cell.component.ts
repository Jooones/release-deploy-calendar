import {Component, Input} from "@angular/core";
import {Day} from "../../domain/calendar.model";

@Component({
  selector: 'rdc-day-cell-component',
  template: `
    <span>
        {{day.dayOfMonth}}<br/>
        dev: {{day.developVersion}}<br/>
        rc: {{day.rcVersion}}<br/>
        stg: {{day.stgVersion}}<br/>
        prd: {{day.prdVersion}}<br/>
    </span>
  `
})
export class DayCellComponent {

  @Input()
  day: Day;

}
