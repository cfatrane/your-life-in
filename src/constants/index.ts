/* eslint-disable sort-keys */
const LIFE_PERIOD = [
  { min: 0, max: 2, label: "Nourrisson", color: "bg-blue-500" },
  {
    min: 2,
    max: 6,
    parent: "École Primaire",
    label: "École Maternelle",
    color: "bg-green-500",
  },
  {
    min: 6,
    max: 11,
    parent: "École Primaire",
    label: "École Élémentaire",
    color: "bg-green-500",
  },
  { min: 11, max: 14, label: "Collège", color: "bg-yellow-500" },
  { min: 14, max: 18, label: "Lycée", color: "bg-pink-500" },
  { min: 18, max: 21, label: "Université", color: "bg-red-500" },
  { min: 21, max: 64, label: "Carrière", color: "bg-purple-500" },
  { min: 64, max: 90, label: "Retraite", color: "bg-black" },
];
const NUMBER_OF_CASE_FOR_WEEKS = 52 * 90;
const NUMBER_OF_CASE_FOR_YEARS = 9 * 10;

export { LIFE_PERIOD, NUMBER_OF_CASE_FOR_WEEKS, NUMBER_OF_CASE_FOR_YEARS };
