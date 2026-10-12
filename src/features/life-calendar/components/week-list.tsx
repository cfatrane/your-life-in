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
    <div className="story-week-list">
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
