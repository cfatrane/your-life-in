"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ageAtDate,
  anniversary,
} from "@/features/life-calendar/lib/life-dates";
import { intervalToDuration } from "date-fns";

import { Button } from "@/components/ui/button";

type TimeSinceBirthProps = {
  birthDate: string | null;
  today: string;
};

const CENTISECOND_IN_MS = 10;

function formatWithLeadingZero(value: number) {
  return String(value).padStart(2, "0");
}

export function TimeSinceBirth({ birthDate, today }: TimeSinceBirthProps) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!birthDate) {
      return;
    }

    setNowMs(Date.now());
    if (reducedMotion || paused) return;
    const interval = window.setInterval(() => {
      setNowMs(Date.now());
    }, 10);

    return () => {
      window.clearInterval(interval);
    };
  }, [birthDate, today, reducedMotion, paused]);

  const elapsed = useMemo(() => {
    if (!birthDate) {
      return null;
    }

    const startDate = new Date(`${birthDate}T00:00:00`);
    const elapsedMs = Math.max(0, nowMs - startDate.getTime());
    const currentDate = new Date(nowMs);
    const years = ageAtDate(startDate, currentDate);
    const duration = intervalToDuration({
      start: anniversary(startDate, years),
      end: currentDate,
    });
    const centiseconds = Math.floor((elapsedMs % 1000) / CENTISECOND_IN_MS);

    return {
      years,
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

  const elapsedText = `${elapsed.years} ${elapsed.years === 1 ? "an" : "ans"} ${elapsed.months} mois ${elapsed.days} ${elapsed.days === 1 ? "jour" : "jours"} ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;

  return (
    <div>
      <p className="elapsed-time">
        {elapsedText}

        {!reducedMotion && (
          <span className="elapsed-fraction">.{elapsed.centiseconds}</span>
        )}
      </p>

      {!reducedMotion && (
        <Button
          className="counter-pause"
          onClick={() => setPaused(!paused)}
          variant="ghost"
        >
          {paused ? "Reprendre le compteur" : "Mettre le compteur en pause"}
        </Button>
      )}
    </div>
  );
}
