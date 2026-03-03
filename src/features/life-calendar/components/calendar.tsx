import { WeekCell } from "@/features/life-calendar/types";

import { WeekList } from "./week-list";
import { WeekNumberList } from "./week-number-list";
import { YearNumberList } from "./year-number-list";

type CalendarProps = {
  weekList: WeekCell[];
};

export function Calendar({ weekList }: CalendarProps) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "min-content 1fr",
        gridTemplateRows: "min-content 1fr",
      }}
    >
      <div />

      <div className="mb-2">
        <WeekNumberList />
      </div>

      <div className="mr-2">
        <YearNumberList />
      </div>

      <WeekList weekList={weekList} />
    </div>
  );
}
