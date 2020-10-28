import {DayTo} from "../services/calendar-to.model";

export class YearMonth {

  static parse(yearMonthAsString: string): YearMonth {
    const split = yearMonthAsString.split('-');
    return new YearMonth(parseInt(split[0]), parseInt(split[1]));
  }

  static fromDayTo(dayTo: DayTo): YearMonth {
    return new YearMonth(parseInt(dayTo.year), dayTo.monthOfYear);
  }

  constructor(public year: number,
              public month: number) {
  }

  previous(): YearMonth {
    return this.month === 1
      ? new YearMonth(this.year - 1, 12)
      : new YearMonth(this.year, this.month - 1)
  }

  next(): YearMonth {
    return this.month === 12
      ? new YearMonth(this.year + 1, 1)
      : new YearMonth(this.year, this.month + 1)
  }

  lastDay(): number {
    return new Date(this.year, this.month, 0).getDate();
  }

  toString(): string {
    return `${this.year}-${this.month}`;
  }

  equals(other: YearMonth): boolean {
    return other.year === this.year && other.month === this.month;
  }
}
