export interface CalendarTo {
  months: Array<MonthTo>;
}

export interface MonthTo {
  year: string;
  monthOfYear: number;
  days: Array<DayTo>;
}

export interface DayTo {
  dayOfMonth: number;
  dayOfWeek: number;
}

export function testCalendar():CalendarTo {
  const newVar = {
    months: [testMonth()]
  };

  console.log(newVar)

  return newVar
}

export function testMonth(): MonthTo {
  return{
    year: "2020",
    monthOfYear: 1,
      days: generateDays()
  }
}

export function generateDays(): Array<DayTo> {
  let result: Array<DayTo> = [];

  Array.from(Array(31).keys()).forEach((day:number) => {
    result[day] = testDay((day + 1), ((day)%7 + 1))
  });

  return result;
}

export function testDay(dayOfMonth: number = 1, dayOfWeek: number = 1): DayTo {
  return {
    dayOfMonth: dayOfMonth,
    dayOfWeek: dayOfWeek
  }
}
