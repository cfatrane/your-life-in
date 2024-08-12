import { NUMBER_OF_YEARS_BY_LIFE } from "@/constants/layout";

function YearNumberList() {
  return (
    <div className="relative">
      <p className="absolute top-0 origin-top-left rotate-90">Years</p>

      <div
        className="grid gap-1"
        style={{
          gridTemplateRows: `repeat(${NUMBER_OF_YEARS_BY_LIFE}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: NUMBER_OF_YEARS_BY_LIFE }, (item, index) => ({
          id: index,
        })).map((_, index) => (
          <div
            className="flex size-3 shrink-0 items-center justify-center"
            key={index}
          >
            {index % 5 === 0 && <p className="text-center text-xs">{index}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
export default YearNumberList;
