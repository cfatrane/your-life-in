"use client";

import { useMemo } from "react";

import { BirthDateInput } from "@/features/life-calendar/components/birth-date-input";
import { Calendar } from "@/features/life-calendar/components/calendar";
import { Legend } from "@/features/life-calendar/components/legend";
import { TimeSinceBirth } from "@/features/life-calendar/components/time-since-birth";
import { useBirthDate } from "@/features/life-calendar/hooks/use-birth-date";
import { useCurrentDay } from "@/features/life-calendar/hooks/use-current-day";
import { buildWeekList } from "@/features/life-calendar/lib/build-week-list";

import { Button } from "@/components/ui/button";

export function LifeCalendar() {
  const { birthDate, saveBirthDate, clearBirthDate, message, ready } =
    useBirthDate();
  const today = useCurrentDay();
  const weekList = useMemo(
    () => (birthDate ? buildWeekList(birthDate, today) : []),
    [birthDate, today],
  );
  const currentWeek = weekList.find((week) => week.state === "current");

  return (
    <>
      <div className="mb-12 flex flex-col items-center gap-4">
        <BirthDateInput
          disabled={!ready}
          onChange={saveBirthDate}
          value={birthDate}
        />

        <p aria-label="Sauvegarde de la date de naissance" role="status">
          {message}
        </p>

        <Button
          className="h-11"
          disabled={!ready}
          onClick={clearBirthDate}
          variant="outline"
        >
          Effacer ma date
        </Button>

        {birthDate ? (
          <TimeSinceBirth birthDate={birthDate} today={today} />
        ) : (
          <p>Sélectionne ta date de naissance pour afficher ton calendrier.</p>
        )}
      </div>

      {birthDate && (
        <section aria-label="Calendrier de vie">
          <Legend />

          {birthDate.endsWith("02-29") && (
            <p className="mb-4 text-center">
              Pour une naissance le 29 février, l’anniversaire de référence est
              le 1er mars les années non bissextiles.
            </p>
          )}

          <p className="mb-4 text-center">
            {currentWeek
              ? `Semaine actuelle : semaine ${currentWeek.number}, dans l’année d’âge de ${currentWeek.age} ${currentWeek.age === 1 ? "an" : "ans"} (repère A).`
              : "Tu as dépassé l'horizon de ce calendrier"}
          </p>

          <div className="mx-auto w-full max-w-full md:w-fit">
            <Calendar key={birthDate} weekList={weekList} />
          </div>
        </section>
      )}
    </>
  );
}
