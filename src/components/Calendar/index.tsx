import { DayType } from "@/types/layout";

import DayList from "../DayList";
import WeekList from "../WeekList";
import YearList from "../YearList";

type Props = { weekList: DayType[] };

function Calendar({ weekList }: Props) {
  return (
    <div
      className="mx-auto grid"
      style={{
        gridTemplateColumns: "min-content 1fr",
        gridTemplateRows: "min-content 1fr",
      }}
    >
      <div />

      <div className="mb-2">
        <WeekList />
      </div>

      <div className="mr-2">
        <YearList />
      </div>

      <DayList weekList={weekList} />
    </div>
  );
}
export default Calendar;
