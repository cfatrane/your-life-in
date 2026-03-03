import { NUMBER_OF_WEEKS_BY_YEAR } from "@/features/life-calendar/constants";
import { WeekCell } from "@/features/life-calendar/types";

import { Week } from "./week";

type WeekListProps = {
  weekList: WeekCell[];
};

export function WeekList({ weekList }: WeekListProps) {
  return (
    <div
      className="grid shrink-0 place-items-center gap-1"
      style={{
        gridTemplateColumns: `repeat(${NUMBER_OF_WEEKS_BY_YEAR}, minmax(0, 1fr))`,
      }}
    >
      {weekList.map((item, index) => (
        <Week isActive={item.isActive} key={item.id} weekNumber={index + 1} />
      ))}
    </div>
  );
}
