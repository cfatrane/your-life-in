import { Fragment } from "react";

// import { v4 as uuidv4 } from "uuid";
import { NUMBER_OF_WEEKS_BY_YEAR } from "@/constants/layout";

function WeekList() {
  return (
    <div
      className={`grid gap-1`}
      style={{
        gridTemplateRows: `repeat(${90}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: 90 }, (item, index) => ({
        id: index,
      })).map((_, index) => (
        <div
          className="flex size-4 shrink-0 items-center justify-center"
          key={index}
        >
          {index % 5 === 0 && <p className="text-center">{index}</p>}
        </div>
      ))}
    </div>
  );
}
export default WeekList;
