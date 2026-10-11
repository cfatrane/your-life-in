import { MAX_WEEKS_BY_AGE } from "@/features/life-calendar/constants";

export function WeekNumberList() {
  return (
    <div>
      <p className="mb-2">Débuts de semaine dans l’année d’âge</p>

      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${MAX_WEEKS_BY_AGE}, 12px)` }}
      >
        {Array.from({ length: MAX_WEEKS_BY_AGE }, (_, index) => (
          <span className="text-center text-xs" key={index}>
            {index % 3 === 0 ? index + 1 : null}
          </span>
        ))}
      </div>
    </div>
  );
}
