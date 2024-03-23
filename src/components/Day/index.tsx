import { useEffect, useState } from "react";

import Tooltip from "@mui/material/Tooltip";

type Props = { isActive: boolean; weekNumber: number };

function Day({ isActive, weekNumber }: Props) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (weekNumber <= 52) {
      setTitle(`${weekNumber} weeks`);
    } else if (weekNumber > 52) {
      setTitle(
        `${Math.trunc(weekNumber / 52)} years and ${weekNumber % 52} weeks`
      );
    }
  }, []);

  return (
    <Tooltip title={title}>
      <div
        className={`size-10 border ${isActive ? "bg-red-500" : "bg-transparent text-xs"}`}
      >
        {weekNumber}
      </div>
    </Tooltip>
  );
}

export default Day;
