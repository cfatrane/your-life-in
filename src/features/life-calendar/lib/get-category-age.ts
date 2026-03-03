import { LIFE_PERIOD } from "@/features/life-calendar/constants";
import { Category } from "@/features/life-calendar/types";

export function getCategoryAge(ageYears: number): Category {
  const matchingCategory = LIFE_PERIOD.find(
    (category) => ageYears > category.min && ageYears <= category.max,
  );

  return matchingCategory ?? LIFE_PERIOD[LIFE_PERIOD.length - 1];
}
