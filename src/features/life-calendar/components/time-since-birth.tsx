"use client";

import { useEffect, useMemo, useState } from "react";

import { intervalToDuration } from "date-fns";

type TimeSinceBirthProps = {
  birthDate: string | null;
};

const CENTISECOND_IN_MS = 10;

function formatWithLeadingZero(value: number) {
  return String(value).padStart(2, "0");
}

export function TimeSinceBirth({ birthDate }: TimeSinceBirthProps) {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (!birthDate) {
      return;
    }

    const interval = window.setInterval(() => {
      setNowMs(Date.now());
    }, 10);

    return () => {
      window.clearInterval(interval);
    };
  }, [birthDate]);

  const elapsed = useMemo(() => {
    if (!birthDate) {
      return null;
    }

    const startDate = new Date(`${birthDate}T00:00:00`);
    const elapsedMs = Math.max(0, nowMs - startDate.getTime());
    const currentDate = new Date(nowMs);
    const duration = intervalToDuration({ start: startDate, end: currentDate });
    const centiseconds = Math.floor((elapsedMs % 1000) / CENTISECOND_IN_MS);

    return {
      years: duration.years ?? 0,
      months: duration.months ?? 0,
      days: duration.days ?? 0,
      hours: formatWithLeadingZero(duration.hours ?? 0),
      minutes: formatWithLeadingZero(duration.minutes ?? 0),
      seconds: formatWithLeadingZero(duration.seconds ?? 0),
      centiseconds: formatWithLeadingZero(centiseconds),
    };
  }, [birthDate, nowMs]);

  if (!elapsed) {
    return null;
  }

  return (
    <div className="text-center">
      <p className="font-mono text-5xl tracking-tight text-zinc-900 md:text-7xl">
        {elapsed.years}y {elapsed.months}m {elapsed.days}d {elapsed.hours}:
        {elapsed.minutes}:{elapsed.seconds}
        <span className="text-zinc-400">.{elapsed.centiseconds}</span>
      </p>
    </div>
  );
}
