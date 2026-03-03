import { WeekCell } from "@/features/life-calendar/types";

export function buildWeekList(
  weeksAlive: number,
  totalWeeks: number,
): WeekCell[] {
  return Array.from({ length: totalWeeks }, (_, index) => ({
    id: index,
    isActive: index < weeksAlive,
  }));
}
