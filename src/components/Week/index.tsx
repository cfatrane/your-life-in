"use client";

import { memo } from "react";

import { getCategoryAge, weeksToYears } from "@/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

type Props = { isActive: boolean; weekNumber: number };

const Week = memo(function Day({ isActive, weekNumber }: Props) {
  let title = "";

  if (weekNumber <= 52) {
    title = `${weekNumber} weeks`;
  } else if (weekNumber > 52) {
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

export default Week;
