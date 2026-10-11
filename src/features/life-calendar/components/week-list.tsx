import { MAX_WEEKS_BY_AGE } from "@/features/life-calendar/constants";
import { WeekCell } from "@/features/life-calendar/types";

import { Week } from "./week";

export function WeekList({ weekList }: { weekList: WeekCell[] }) {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${MAX_WEEKS_BY_AGE}, 12px)` }}
    >
      {weekList.map((week) => (
        <Week key={week.number} week={week} />
      ))}
    </div>
  );
}
