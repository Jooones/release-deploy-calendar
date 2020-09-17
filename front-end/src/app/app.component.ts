import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Calendar} from "./calendar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calendar: Calendar;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.calendar = {content: ''};
  }

  private getCalendar(): void {
    this.calendar.content = 'gimme a min..';
    this.httpClient.get<Calendar>(`api/calendar`).subscribe(response => this.calendar.content = response.content);
  }
}
