import { useEffect, useState } from "react";

import { format } from "date-fns";

export function useCurrentDay() {
  const [today, setToday] = useState(() => format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function refresh() {
      const now = new Date();

      setToday(format(now, "yyyy-MM-dd"));
      clearTimeout(timeout);
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );

      timeout = setTimeout(refresh, midnight.getTime() - now.getTime());
    }

    function onVisibilityChange() {
      if (document.visibilityState === "visible") refresh();
    }

    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return today;
}
