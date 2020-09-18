import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT
} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/moment";
// @ts-ignore
import moment from 'moment';
import {CommonModule} from "@angular/common";

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule, HttpClientModule,
    BrowserAnimationsModule,

    CalendarModule.forRoot(
      {
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter,
        },
      }),
  ],
  providers: [
    {
      provide: MOMENT,
      useValue: moment,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
