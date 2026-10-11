import { useState } from "react";

import { NUMBER_OF_YEARS_BY_LIFE } from "@/features/life-calendar/constants";
import { describeWeek } from "@/features/life-calendar/lib/describe-week";
import { WeekCell } from "@/features/life-calendar/types";

import { MobileCalendar } from "./mobile-calendar";
import { WeekList } from "./week-list";
import { WeekNumberList } from "./week-number-list";

export function Calendar({ weekList }: { weekList: WeekCell[] }) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const selectedWeek = weekList.find((week) => week.number === selectedNumber);
  const years = Array.from(
    { length: NUMBER_OF_YEARS_BY_LIFE },
    () => [] as WeekCell[],
  );

  for (const week of weekList) years[week.age].push(week);

  return (
    <>
      <MobileCalendar years={years} />

      <div className="hidden md:block">
        <p
          aria-label="Détails de la semaine"
          className="bg-background sticky top-2 z-10 mb-4 rounded-md border p-4 text-center text-sm shadow-sm"
          role="status"
        >
          {selectedWeek
            ? describeWeek(selectedWeek)
            : "Sélectionne une semaine pour consulter ses détails. Au clavier, utilise Tab pour naviguer, puis Entrée ou Espace pour sélectionner."}
        </p>

        <div className="overflow-x-auto p-2">
          <div className="w-max">
            <div className="mb-2 grid grid-cols-[4rem_auto] gap-2">
              <span className="self-end">Âge</span>

              <WeekNumberList />
            </div>

            {years.map((weeks, age) => (
              <div
                aria-label={`Âge : ${age} ${age === 1 ? "an" : "ans"}`}
                className="grid grid-cols-[4rem_auto] items-center gap-2"
                key={age}
                role="group"
              >
                <span className="text-xs leading-4">
                  {`${age} ${age === 1 ? "an" : "ans"}`}
                </span>

                <WeekList
                  onSelect={setSelectedNumber}
                  selectedNumber={selectedNumber}
                  weekList={weeks}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
