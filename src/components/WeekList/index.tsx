import Week from "@/components/Week";

import { NUMBER_OF_WEEKS_BY_YEAR } from "@/constants/layout";

import { DayType } from "@/types/layout";

type Props = { weekList: DayType[] };

function WeekList({ weekList }: Props) {
  return (
    <div
      className={`grid shrink-0 place-items-center gap-1`}
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

export default WeekList;
