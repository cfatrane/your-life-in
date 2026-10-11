"use client";

import { memo } from "react";

import { WEEK_STATES } from "@/features/life-calendar/constants";
import { describeWeek } from "@/features/life-calendar/lib/describe-week";
import { WeekCell } from "@/features/life-calendar/types";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export const Week = memo(function Week({
  week,
  selected,
  onSelect,
}: {
  week: WeekCell;
  selected: boolean;
  onSelect: (number: number) => void;
}) {
  const state = WEEK_STATES[week.state];

  return (
    <Button
      aria-current={week.state === "current" ? "date" : undefined}
      aria-label={describeWeek(week)}
      aria-pressed={selected}
      className={cn(
        "size-11 rounded-none border p-0 text-sm font-bold text-blue-950 transition-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 md:size-3 md:text-[9px]",
        selected && "ring-1 ring-blue-800 ring-offset-1",
        state.className,
      )}
      onClick={() => onSelect(week.number)}
      size="icon"
      type="button"
      variant="ghost"
    >
      {week.state === "current" ? "A" : null}
    </Button>
  );
});
