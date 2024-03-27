import Day from "@/components/Day";

import { NUMBER_OF_WEEKS_BY_YEAR } from "@/constants/layout";

type Props = { weekList: any[]; weeksAlive: number };

function DayList({ weekList, weeksAlive }: Props) {
  return (
    <div
      className={`grid place-items-center gap-1`}
      style={{
        gridTemplateColumns: `repeat(${NUMBER_OF_WEEKS_BY_YEAR + 1}, minmax(0, 1fr))`,
      }}
    >
      {weekList.map((item, index) => (
        <>
          {index % 52 === 0 ? (
            <>
              <div>
                {(index / 52) % 5 === 0 && (
                  <p className="text-xs">{index / 52}</p>
                )}
              </div>

              <Day
                isActive={index < weeksAlive}
                key={item.id}
                weekNumber={index + 1}
              />
            </>
          ) : (
            <Day
              isActive={index < weeksAlive}
              key={item.id}
              weekNumber={index + 1}
            />
          )}
        </>
      ))}
    </div>
  );
}

export default DayList;
