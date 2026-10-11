import { NUMBER_OF_YEARS_BY_LIFE } from "@/features/life-calendar/constants";
import { WeekCell } from "@/features/life-calendar/types";

import { WeekList } from "./week-list";
import { WeekNumberList } from "./week-number-list";

export function Calendar({ weekList }: { weekList: WeekCell[] }) {
  const years = Array.from(
    { length: NUMBER_OF_YEARS_BY_LIFE },
    () => [] as WeekCell[],
  );

  for (const week of weekList) years[week.age].push(week);

  return (
    <div className="overflow-x-auto p-2">
      <div className="w-max">
        <div className="mb-2 grid grid-cols-[4rem_auto] gap-2">
          <span className="self-end">Âge</span>

          <WeekNumberList />
        </div>

        {years.map((weeks, age) => (
          <div
            aria-label={`Âge : ${age} ${age === 1 ? "an" : "ans"}`}
            className="grid grid-cols-[4rem_auto] items-center gap-2"
            key={age}
            role="group"
          >
            <span className="text-xs leading-4">
              {`${age} ${age === 1 ? "an" : "ans"}`}
            </span>

            <WeekList weekList={weeks} />
          </div>
        ))}
      </div>
    </div>
  );
}
