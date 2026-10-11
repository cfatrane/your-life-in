import { useId, useState } from "react";

import { NUMBER_OF_YEARS_BY_LIFE } from "@/features/life-calendar/constants";
import { describeWeek } from "@/features/life-calendar/lib/describe-week";
import { WeekCell } from "@/features/life-calendar/types";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { WeekList } from "./week-list";
import { WeekNumberList } from "./week-number-list";

export function Calendar({ weekList }: { weekList: WeekCell[] }) {
  const id = useId();
  const [selectedAge, setSelectedAge] = useState(
    () =>
      weekList.find((week) => week.state === "current")?.age ??
      NUMBER_OF_YEARS_BY_LIFE - 1,
  );
  const decade = Math.floor(selectedAge / 10);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const selectedWeek = weekList.find((week) => week.number === selectedNumber);
  const details = selectedWeek
    ? describeWeek(selectedWeek)
    : "Sélectionne une semaine pour consulter ses détails. Au clavier, utilise Tab pour naviguer, puis Entrée ou Espace pour sélectionner.";
  const years = Array.from(
    { length: NUMBER_OF_YEARS_BY_LIFE },
    () => [] as WeekCell[],
  );

  for (const week of weekList) years[week.age].push(week);

  return (
    <div>
      <p
        aria-label="Détails de la semaine"
        className="bg-background sticky top-2 z-10 mb-4 hidden rounded-md border p-4 text-center text-sm shadow-sm md:block"
        role="status"
      >
        {details}
      </p>

      <label className="mb-4 flex flex-col gap-2 md:hidden">
        Décennie de vie
        <select
          className="bg-background h-11 w-full rounded-md border px-3 text-base focus-visible:outline-2 focus-visible:outline-blue-800"
          onChange={(event) => {
            setSelectedAge(Number(event.target.value) * 10);
            setSelectedNumber(null);
          }}
          value={decade}
        >
          {Array.from({ length: NUMBER_OF_YEARS_BY_LIFE / 10 }, (_, index) => (
            <option key={index} value={index}>
              {`${index * 10}–${index * 10 + 9} ans`}
            </option>
          ))}
        </select>
      </label>

      <div className="md:overflow-x-auto md:p-2">
        <div className="md:w-max">
          <div className="mb-2 hidden grid-cols-[4rem_auto] gap-2 md:grid">
            <span className="self-end">Âge</span>

            <WeekNumberList />
          </div>

          {years.map((weeks, age) => (
            <div
              aria-label={`Âge : ${age} ${age === 1 ? "an" : "ans"}`}
              className={cn(
                "mb-2 items-start gap-2 md:mb-0 md:grid md:grid-cols-[4rem_auto] md:items-center",
                Math.floor(age / 10) !== decade && "hidden",
              )}
              key={age}
              role="group"
            >
              <span className="hidden text-xs leading-4 md:block">
                {`${age} ${age === 1 ? "an" : "ans"}`}
              </span>

              <Button
                aria-controls={`${id}-year-${age}`}
                aria-expanded={age === selectedAge}
                aria-label={`Âge : ${age} ${age === 1 ? "an" : "ans"}`}
                className="h-11 w-full justify-between md:hidden"
                onClick={() => {
                  setSelectedAge(age);
                  setSelectedNumber(null);
                }}
                type="button"
                variant="outline"
              >
                {`${age} ${age === 1 ? "an" : "ans"}`}

                <span aria-hidden="true">
                  {age === selectedAge ? "−" : "+"}
                </span>
              </Button>

              <div
                className={cn(
                  "mt-2 md:mt-0 md:block",
                  age !== selectedAge && "hidden",
                )}
                id={`${id}-year-${age}`}
              >
                <WeekList
                  onSelect={setSelectedNumber}
                  selectedNumber={selectedNumber}
                  weekList={weeks}
                />

                {age === selectedAge && (
                  <p
                    aria-label="Détails de la semaine"
                    className="mt-4 rounded-md border p-3 text-sm md:hidden"
                    role="status"
                  >
                    {details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
