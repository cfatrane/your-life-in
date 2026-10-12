import type { CSSProperties } from "react";

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
      className="grid grid-cols-6 gap-1 md:grid-cols-[repeat(var(--week-columns),12px)]"
      style={{ "--week-columns": MAX_WEEKS_BY_AGE } as CSSProperties}
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
