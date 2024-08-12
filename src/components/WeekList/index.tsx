import { NUMBER_OF_WEEKS_BY_YEAR } from "@/constants/layout";

function WeekList() {
  return (
    <div className="grid shrink">
      <p>Weeks</p>

      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${NUMBER_OF_WEEKS_BY_YEAR}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: NUMBER_OF_WEEKS_BY_YEAR }, (item, index) => ({
          id: index,
        })).map((_, index) => (
          <div
            className="flex size-3 shrink-0 items-center justify-center"
            key={index}
          >
            {index % 3 === 0 && (
              <p className="text-center text-xs">{index + 1}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default WeekList;
