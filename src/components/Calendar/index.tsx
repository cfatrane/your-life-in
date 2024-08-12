import { DayType } from "@/types/layout";

import WeekList from "../WeekList";
import WeekNumberList from "../WeekNumberList";
import YearNumberList from "../YearNumberList";

type Props = { weekList: DayType[] };

function Calendar({ weekList }: Props) {
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
export default Calendar;
