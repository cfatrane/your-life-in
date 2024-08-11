import { NUMBER_OF_YEARS_BY_LIFE } from "@/constants/layout";

function WeekList() {
  return (
    <div
      className={`grid gap-1`}
      style={{
        gridTemplateRows: `repeat(${NUMBER_OF_YEARS_BY_LIFE}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: NUMBER_OF_YEARS_BY_LIFE }, (item, index) => ({
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
