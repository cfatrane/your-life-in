import { Category } from "@/types/layout";

const LIFE_PERIOD = [
  {
    color: "bg-blue-500",
    label: "Nourrisson",
    max: 2,
    min: 0,
  },
  {
    color: "bg-green-800",
    label: "École Maternelle",
    max: 6,
    min: 2,
    parent: "École Primaire",
  },
  {
    color: "bg-green-500",
    label: "École Élémentaire",
    max: 11,
    min: 6,
    parent: "École Primaire",
  },
  {
    color: "bg-yellow-400",
    label: "Collège",
    max: 14,
    min: 11,
  },
  {
    color: "bg-orange-400",
    label: "Lycée",
    max: 18,
    min: 14,
  },
  {
    color: "bg-purple-500",
    label: "Université",
    max: 21,
    min: 18,
  },
  {
    color: "bg-red-500",
    label: "Carrière",
    max: 64,
    min: 21,
  },
  {
    color: "bg-black",
    label: "Retraite",
    max: 90,
    min: 64,
  },
] as Category[];

const NUMBER_OF_CASE_FOR_YEARS = 9 * 10;
const NUMBER_OF_WEEKS_BY_YEAR = 20;
// const NUMBER_OF_WEEKS_BY_YEAR = 52;
const NUMBER_OF_WEEKS_BY_LIFE = 90;
const NUMBER_OF_CASE_FOR_WEEKS =
  NUMBER_OF_WEEKS_BY_YEAR * NUMBER_OF_WEEKS_BY_LIFE;

export {
  LIFE_PERIOD,
  NUMBER_OF_CASE_FOR_WEEKS,
  NUMBER_OF_CASE_FOR_YEARS,
  NUMBER_OF_WEEKS_BY_YEAR,
};
