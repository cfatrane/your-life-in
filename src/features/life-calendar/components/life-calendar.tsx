"use client";

import { BirthDateInput } from "@/features/life-calendar/components/birth-date-input";
import { Calendar } from "@/features/life-calendar/components/calendar";
import { TimeSinceBirth } from "@/features/life-calendar/components/time-since-birth";
import { NUMBER_OF_CASE_FOR_WEEKS } from "@/features/life-calendar/constants";
import { useBirthDate } from "@/features/life-calendar/hooks/use-birth-date";
import { useWeeksAlive } from "@/features/life-calendar/hooks/use-weeks-alive";
import { buildWeekList } from "@/features/life-calendar/lib/build-week-list";

import { Button } from "@/components/ui/button";

export function LifeCalendar() {
  const { birthDate, saveBirthDate, clearBirthDate, message, ready } =
    useBirthDate();
  const weeksAlive = useWeeksAlive(birthDate);
  const weekList = buildWeekList(weeksAlive, NUMBER_OF_CASE_FOR_WEEKS);

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

        <Button disabled={!ready} onClick={clearBirthDate} variant="outline">
          Effacer ma date
        </Button>

        {birthDate ? (
          <TimeSinceBirth birthDate={birthDate} />
        ) : (
          <p>Sélectionne ta date de naissance pour afficher ton calendrier.</p>
        )}
      </div>

      {birthDate && (
        <section aria-label="Calendrier de vie" className="flex justify-around">
          <div className="mx-auto xl:mx-0">
            <Calendar weekList={weekList} />
          </div>
        </section>
      )}
    </>
  );
}
