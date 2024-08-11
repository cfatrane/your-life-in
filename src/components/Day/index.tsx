"use client";

import { memo } from "react";

import { getCategoryAge, weeksToYears } from "@/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = { isActive: boolean; weekNumber: number };

const Day = memo(function Day({ isActive, weekNumber }: Props) {
  const title = "";

  // if (weekNumber <= 52) {
  //   title = `${weekNumber} weeks`;
  // } else if (weekNumber > 52) {
  //   title = `${Math.trunc(weekNumber / 52)} years and ${weekNumber % 52} weeks, week ${weekNumber}`;
  // }

  // const category = getCategoryAge(weeksToYears(weekNumber));

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          // className={`size-4 shrink-0 rounded-sm border border-black ${isActive ? category.color : `${category.color} opacity-50`}`}
          className={`size-4 shrink-0 rounded-sm border border-black opacity-50`}
        />
      </TooltipTrigger>

      <TooltipContent>
        <p>{weekNumber}</p>
      </TooltipContent>
    </Tooltip>
  );
});

export default Day;
