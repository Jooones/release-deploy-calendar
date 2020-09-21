import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {CommonModule} from "@angular/common";
import {DayCellComponent} from "./components/DayCell/day-cell.component";
import {CalendarService} from "./services/calendar.service";
import {CalendarMonthComponent} from "./components/calendar-month.component";

@NgModule({
  declarations: [
    AppComponent,
    CalendarMonthComponent,
    DayCellComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CalendarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
