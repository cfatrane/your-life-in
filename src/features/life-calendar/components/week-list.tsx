import { MAX_WEEKS_BY_AGE } from "@/features/life-calendar/constants";
import { WeekCell } from "@/features/life-calendar/types";

import { Week } from "./week";

export function WeekList({
  weekList,
  selectedNumber,
  onSelect,
}: {
  weekList: WeekCell[];
  selectedNumber: number | null;
  onSelect: (number: number) => void;
}) {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${MAX_WEEKS_BY_AGE}, 12px)` }}
    >
      {weekList.map((week) => (
        <Week
          key={week.number}
          onSelect={onSelect}
          selected={week.number === selectedNumber}
          week={week}
        />
      ))}
    </div>
  );
}
