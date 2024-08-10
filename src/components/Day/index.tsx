import { memo } from "react";

import { getCategoryAge, weeksToYears } from "@/utils";
import Tooltip from "@mui/material/Tooltip";

type Props = { isActive: boolean; weekNumber: number };

const Day = memo(function Day({ isActive, weekNumber }: Props) {
  let title = "";

  if (weekNumber <= 52) {
    title = `${weekNumber} weeks`;
  } else if (weekNumber > 52) {
    title = `${Math.trunc(weekNumber / 52)} years and ${weekNumber % 52} weeks, week ${weekNumber}`;
  }

  const category = getCategoryAge(weeksToYears(weekNumber));

  return (
    <Tooltip title={title}>
      <div
        className={`size-4 rounded-sm border border-black ${isActive ? category.color : `${category.color} opacity-50`}`}
      ></div>
    </Tooltip>
  );
});

export default Day;
