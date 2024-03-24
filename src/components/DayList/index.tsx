import Day from "@/components/Day";

import { NUMBER_OF_WEEKS_BY_YEAR } from "@/constants/layout";

type Props = { weekList: any[]; weeksAlive: number };

function DayList({ weekList, weeksAlive }: Props) {
  return (
    <div
      className={`grid place-items-center gap-1`}
      style={{
        gridTemplateColumns: `repeat(${NUMBER_OF_WEEKS_BY_YEAR}, minmax(0, 1fr))`,
      }}
    >
      {weekList.map((item, index) => (
        <Day
          isActive={index < weeksAlive}
          key={item.id}
          weekNumber={index + 1}
        />
      ))}
    </div>
  );
}

export default DayList;
