"use client";

import { memo } from "react";

import { WEEK_STATES } from "@/features/life-calendar/constants";
import { WeekCell } from "@/features/life-calendar/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

export const Week = memo(function Week({ week }: { week: WeekCell }) {
  const state = WEEK_STATES[week.state];
  const title = `Semaine ${week.number}, du ${format(week.start, "d MMMM yyyy", { locale: fr })} au ${format(week.end, "d MMMM yyyy", { locale: fr })} — ${state.label}`;

  return (
    <Tooltip>
      <TooltipTrigger
        aria-current={week.state === "current" ? "date" : undefined}
        aria-label={title}
        className={cn(
          "flex size-3 items-center justify-center border text-[9px] font-bold text-blue-950 focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:outline-none",
          state.className,
        )}
      >
        {week.state === "current" ? "A" : null}
      </TooltipTrigger>

      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
});
