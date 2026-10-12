import { WEEK_STATES } from "@/features/life-calendar/constants";

import { cn } from "@/lib/utils";

export function Legend() {
  return (
    <section aria-label="Légende" className="story-legend">
      {Object.entries(WEEK_STATES).map(([state, { label }]) => (
        <p className="flex items-center gap-2" key={state}>
          <span aria-hidden="true" className={cn("legend-point", state)}>
            {state === "current" ? <span className="sr-only">A</span> : null}
          </span>

          <span>{label}</span>
        </p>
      ))}
    </section>
  );
}
