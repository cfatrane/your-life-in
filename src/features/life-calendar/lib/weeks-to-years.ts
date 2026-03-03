import { NUMBER_OF_WEEKS_BY_YEAR } from "@/features/life-calendar/constants";

export function weeksToYears(weekNumber: number): number {
  return weekNumber / NUMBER_OF_WEEKS_BY_YEAR;
}
