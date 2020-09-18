import {Component, OnInit} from '@angular/core';
import {CalendarService} from "./services/calendar.service";
import {Observable} from "rxjs";
import {Calendar} from "./domain/calendar.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calendar$: Observable<Calendar>;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.calendar$ = this.calendarService.getCalendar();
  }
}
