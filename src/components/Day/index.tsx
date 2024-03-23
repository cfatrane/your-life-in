/* eslint-disable sort-keys */
import Tooltip from "@mui/material/Tooltip";

import { getCategoryAge } from "@/utils";

type Props = { isActive: boolean; weekNumber: number };
const weeksPerYear = 52;

const weeksToYears = (weekNumber: number) => {
  const years = weekNumber / weeksPerYear;

  return years;
};

function Day({ isActive, weekNumber }: Props) {
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
        className={`size-3 rounded-sm border border-black ${isActive ? category.color : `${category.color} opacity-50`}`}
      ></div>
    </Tooltip>
  );
}

export default Day;
