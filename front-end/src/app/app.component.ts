import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CalendarTo} from "./services/calendarTo";
import {CalenderService} from "./services/CalenderService";
import {Observable} from "rxjs";
import {Calendar} from "./domain/Calendar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calendar$: Observable<Calendar>;

  constructor(private calendarService: CalenderService) {
  }

  ngOnInit(): void {
    // this.calendar = {content: ''};
  }

  getCalendar(): void{
    this.calendar$ = this.calendarService.getCalendar();
  }


}
