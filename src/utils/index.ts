import { LIFE_PERIOD, NUMBER_OF_WEEKS_BY_YEAR } from "@/constants/layout";

import { Category } from "@/types/layout";

export function getCategoryAge(age: number) {
  const category = LIFE_PERIOD.find((c) => age > c.min && age <= c.max);

  return category as Category;
}

export const weeksToYears = (weekNumber: number) => {
  const years = weekNumber / NUMBER_OF_WEEKS_BY_YEAR;

  return years;
};
