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
        "story-week focus-visible:ring-ring rounded-full border p-0 text-xs font-medium focus-visible:ring-2 focus-visible:ring-offset-2",
        selected && "ring-ring ring-2 ring-offset-2",
        state.className,
      )}
      onClick={() => onSelect(week.number)}
      size="icon"
      type="button"
      variant="ghost"
    >
      {week.number}

      {week.state === "current" ? " A" : ""}
    </Button>
  );
});
