import { NUMBER_OF_YEARS_BY_LIFE } from "@/features/life-calendar/constants";
import {
  ageAtDate,
  anniversary,
} from "@/features/life-calendar/lib/life-dates";
import { WeekCell } from "@/features/life-calendar/types";
import { addDays, parseISO } from "date-fns";

export function buildWeekList(birthDate: string, today: string): WeekCell[] {
  const birth = parseISO(birthDate);
  const currentDay = parseISO(today);
  const horizon = anniversary(birth, NUMBER_OF_YEARS_BY_LIFE);
  const weeks: WeekCell[] = [];

  for (let start = birth; start < horizon; start = addDays(start, 7)) {
    const nextWeek = addDays(start, 7);
    const end = addDays(nextWeek < horizon ? nextWeek : horizon, -1);

    weeks.push({
      number: weeks.length + 1,
      age: ageAtDate(birth, start),
      start,
      end,
      state:
        currentDay > end ? "past" : currentDay < start ? "future" : "current",
    });
  }

  return weeks;
}
