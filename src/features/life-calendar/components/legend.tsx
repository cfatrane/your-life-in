import { WEEK_STATES } from "@/features/life-calendar/constants";

import { cn } from "@/lib/utils";

export function Legend() {
  return (
    <section
      aria-label="Légende"
      className="mb-6 flex flex-wrap justify-center gap-6"
    >
      {Object.entries(WEEK_STATES).map(([state, { label, className }]) => (
        <p className="flex items-center gap-2" key={state}>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-3 items-center justify-center border text-[9px] font-bold text-blue-950",
              className,
            )}
          >
            {state === "current" ? "A" : null}
          </span>

          <span>{label}</span>
        </p>
      ))}
    </section>
  );
}
