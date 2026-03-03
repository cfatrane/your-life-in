"use client";

import { memo } from "react";

import { getCategoryAge } from "@/features/life-calendar/lib/get-category-age";
import { weeksToYears } from "@/features/life-calendar/lib/weeks-to-years";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

type WeekProps = {
  isActive: boolean;
  weekNumber: number;
};

export const Week = memo(function Week({ isActive, weekNumber }: WeekProps) {
  let title = "";

  if (weekNumber <= 52) {
    title = `${weekNumber} weeks`;
  } else {
    title = `${Math.trunc(weekNumber / 52)} years and ${weekNumber % 52} weeks, week ${weekNumber}`;
  }

  const category = getCategoryAge(weeksToYears(weekNumber));

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            "size-3 shrink-0 border border-black",
            isActive ? category.color : `${category.color} opacity-50`,
          )}
        />
      </TooltipTrigger>

      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
});
