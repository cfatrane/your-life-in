import { LIFE_PERIOD } from "@/constants";

export function getCategoryAge(age: number) {
  const category = LIFE_PERIOD.find((c) => age > c.min && age <= c.max);

  return category ? category : "Inconnu";
}
