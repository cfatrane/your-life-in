export type WeekCell = {
  number: number;
  age: number;
  start: Date;
  end: Date;
  state: "past" | "current" | "future";
};
