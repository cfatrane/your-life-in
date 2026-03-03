import { useMemo } from "react";

import dayjs from "dayjs";

export function useWeeksAlive(birthDate: string | null): number {
  return useMemo(() => {
    if (!birthDate) {
      return 0;
    }

    return dayjs().diff(dayjs(birthDate), "week");
  }, [birthDate]);
}
