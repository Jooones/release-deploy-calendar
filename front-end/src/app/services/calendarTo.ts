export interface CalendarTo {
  days: Array<DayTo>;
}

export interface DayTo {
  dayOfWeek: number;
  dayOfMonth: number;
  monthOfYear: number;
  year: string;
  developVersion: string;
  rcVersion: string;
  stgVersion: string;
  prdVersion: string;
}

export function testCalendar():CalendarTo {
  const newVar = {
    days: generateDays()
  };

  console.log(newVar)

  return newVar
}

export function generateDays(): Array<DayTo> {
  let result: Array<DayTo> = [];

  Array.from(Array(31).keys()).forEach((day:number) => {
    result[day] = testDay(((day) % 7 + 1), (day + 1))
  });

  return result;
}

export function testDay(dayOfWeek: number = 1, dayOfMonth: number = 1, monthOfYear: number = 1, year: string = "2020"): DayTo {
  // return {
  //   dayOfWeek: dayOfWeek,
  //   dayOfMonth: dayOfMonth,
  //   monthOfYear: monthOfYear,
  //   year: year
  // }
  return null;
}
